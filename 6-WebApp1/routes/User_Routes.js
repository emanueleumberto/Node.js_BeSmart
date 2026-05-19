const express = require('express');
const router = express.Router();

// Model
const User = require('../models/User')

// Middlewares
const debug = require('../middlewares/Debug')
const file = require('../middlewares/Upload');

router.get('/', debug.testKey, (req, res) => {
    res.json({message: 'Server Node.js cone Express e MongoDB'})
});

router.get('/users',  async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Gestione dei paramentri passati tramite querystring
// http://localhost:3000/users/page?page=1&size=10&order=age

// sort() | size() | page()

router.get('/users/page',  async (req, res) => {

    // console.log(req.query);

    const limit = req.query.size;
    const skip = (req.query.page-1)*limit;
    const sort = req.query.order;

    // Sort Ordina in base ad una proprietà della collection (1) -> ASC (-1) -> DESC
    // Limit restituisce un numero limitato di risultati
    // Skip quanti elemente devo saltare

    const users = await User.find()
                            .sort({[sort]:1})
                            .limit(limit)
                            .skip(skip)

    res.status(200).json(users);
});

router.get('/users/:id', async (req, res, next) => {
    // http://localhost:3000/users/5
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(error) {
        //res.status(500).json({message: error.message})
        next(error)
    }
});

router.post('/users', async (req, res, next) => {
    const obj = req.body;
    if(obj) {
        const objModel = new User(obj);
        const objSaved = await objModel.save();
        res.status(201).json(objSaved);
    } else {
        //res.status(500).json({message: 'Nessun dato inviato.'})
        next('Nessun dato inviato.')
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
            //res.status(500).json({message: 'Nessun dato inviato.'})
            next('Nessun dato inviato.')
        }
    } catch(error) {
        //res.status(500).json({message: error.message})
        next(error)
    }
});

router.delete('/users/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'User deleted'})
    } catch(error) {
        //res.status(500).json({message: error.message})
        next(error)
    }
});

router.post('/upload', file.upload.single('uploaded_file'),  (req, res) => {
    const file = req.file;
    console.log(file)
    res.status(200).json({ message: 'File salvato nella cartella uploads' })
})

module.exports = router