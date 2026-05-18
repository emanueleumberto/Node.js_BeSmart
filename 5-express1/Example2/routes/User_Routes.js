/*
    Gestione modulare delle rotte
    Express consente di organizzare le rotte in moduli separati, migliorando la manutenibilità del codice.

    In questo esempio, le rotte sono dichiarate ed organizzate in un modulo dedicato
    e collegate all'applicazione principale tramite il metodo use()
*/

/*
    In Express è possibile concatenare più middleware per ogni singola rotta,
    i middleware vengono eseguiti in ordine, da sinistra a destra e ciascuno di essi può decidere
    se proseguire la catena, invocando il metodo next(), oppure terminare la risposta. 

    app.get('/', middleware1, middleware2, ... ,(request, response) => { response.send("Benvenuto su Express!"); });
*/

const express = require('express');
const router = express.Router();

// Import del Model da utilizzare nelle rotte
const User = require('../models/User')

// Middleware Custom
const debug = require('../middlewares/Debug');

// Endpoint Express
router.get('/', (req, res) => {
    res.json({message: 'Server Node.js con Express e MongoDB'})
});

// Middleware da applicare selettivamente a specifiche rotte
router.get('/users', debug.testKey , async (req, res) => {
    const users = await User.find();
    res.status(200).json(users)
})

router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/users', async (req, res) => {
    const obj = req.body;
    if(obj) {
        const objModel = new User(obj);
        const objSaved = await objModel.save();
        res.status(201).json(objSaved);
    } else {
        res.status(500).json({message: 'Nessun utente inviato.'});
    }
})

router.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    try {
        if(obj) {
            await User.findByIdAndUpdate(id, obj)
            res.status(200).json({message: 'User updated'});
        } else {
            res.status(500).json({message: 'Nessun utente inviato.'});
        }
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({message: 'User deleted'});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router