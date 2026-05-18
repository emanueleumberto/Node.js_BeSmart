/*
    Gestione modulare delle rotte
    Express consente di organizzare le rotte in moduli separati, migliorando 
    la manutenibilità del codice.

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

// Import del model User da utilizzare nelle rotte
const User = require('../models/User');

// Import Middleware Cusom
const debug = require('../middlewares/Debug');


router.get('/', (req, res) => {
    res.json({message: 'Server Node.js cone Express e MongoDB'})
});

router.get('/users', debug.testKeys, async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

router.get('/users/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(error) {
        //res.status(500).json({message: error.message})
        next(error.message);
    }
});

router.post('/users', async (req, res, next) => {
    const obj = req.body;
    if(obj) {
        const objModel = new User(obj);
        const objSaved = await objModel.save();
        res.status(201).json(objSaved);
    } else {
        // res.status(500).json({message: 'Nessun dato inviato.'})
        next('Nessun dato inviato.');
    }
});

router.put('/users/:id', async (req, res, next) => {
    const id = req.params.id;
    const obj = req.body;
    try {
        if(obj) {
            await User.findByIdAndUpdate(id, obj);
            res.status(200).json({message: 'User updated'})
        } else {
            // res.status(500).json({message: 'Nessun dato inviato.'})
            next('Nessun dato inviato.');
        }
    } catch(error) {
        // res.status(500).json({message: error.message})
        next(error.message);
    }
});

router.delete('/users/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'User deleted'})
    } catch(error) {
        // res.status(500).json({message: error.message})
        next(error.message);
    }
});


module.exports = router;
