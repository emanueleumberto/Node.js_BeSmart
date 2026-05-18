const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Middleware per la gestione dei CORS
app.use(express.json()); // Middleware per la gestione dei file JSON

// Middleware globale
const debug = require('./middlewares/Debug');
app.use(debug.logger);
// app.use(debug.testKey);

// Routes
const routes = require('./routes/User_Routes');
app.use(routes)

// async function start() {
//     try {
//         await mongoose.connect(process.env.MONGO_DB)
//         app.listen(process.env.PORT, () => {
//             console.log('Server in ascolto sulla porta ', port);
//         })
//     } catch (error) {
//         console.error('Errore nella connessione al DB. Server non avviato', error);
//     }
// }

// start();

mongoose.connect(process.env.MONGO_DB)
    .then(result => {
        app.listen(process.env.PORT, () => {
            console.log('Server in ascolto sulla porta ', process.env.PORT);
        })
    }).catch(error => {
        console.error('Errore nella connessione al DB. Server non avviato ', error);
    });
