const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const dbName = 'BeSmart';
const url = 'mongodb://admin:Qp1CxtD4s3j6q6TB@ac-ld6xweg-shard-00-00.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-01.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-02.7opl1ou.mongodb.net:27017/BeSmart?ssl=true&replicaSet=atlas-1hpwfy-shard-0&authSource=admin&appName=Cluster0'

// Middleware
app.use(cors());
app.use(express.json());

// Schema Mongoose
// Lo schema sarà la struttura che deve avere ogni oggetto che salverò nella Collection di Mongo DB
const userSchema = new mongoose.Schema({
    firstname: {type: String, require: true}, 
    lastname: {type: String, require: true}, 
    age: {type: Number, require: true}, 
    email: {type: String, require: true}, 
    createdAt: {type: Date, default: Date.now}
});

// Model Mongoose
// Model mi permette di creare un oggetto e definire la collection di riferimento e lo schema da utilizzare
const User = mongoose.model('users', userSchema);

// Endpoint Express
app.get('/', (req, res) => {
    res.json({message: 'Server Node.js con Express e MongoDB'})
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users)
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/users', async (req, res) => {
    const obj = req.body;
    if(obj) {
        const objModel = new User(obj);
        const objSaved = await objModel.save();
        res.status(201).json(objSaved);
    } else {
        res.status(500).json({message: 'Nessun utente inviato.'});
    }
})

app.put('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({message: 'User deleted'});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

async function start() {
    try {
        await mongoose.connect(url)
        app.listen(port, () => {
            console.log('Server in ascolto sulla porta ', port);
        })
    } catch (error) {
        console.error('Errore nella connessione al DB. Server non avviato');
    }
}

start();
