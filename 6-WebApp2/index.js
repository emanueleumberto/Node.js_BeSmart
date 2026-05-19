const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const app = express();

//Middleware
// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());
app.use(express.json());

// middleware
const debug = require('./middlewares/Debug');
app.use(debug.logger);

// npm install compression
// Compressione Gzip utilizzando il modulo compression
// In questo modo i file saranno compressi prima di essere inviati al client
// riducendo il tempo di caricamento e migliorando le prestazioni
app.use(compression());

/*
    Servire file statici
    Quando si sviluppa un'applicazione web, è comune dover gestire file statici come immagini, fogli di stile CSS
    file javascript o documenti. 
    Express semplifica notevolmente il processo di distribuzione dei file statici 
    tramite il middleware integrato express.static(). Questo middleware gestisce automaticamente i file in una directory specifica 
    e li rende disponibili al client.
*/

// Configurazione del middleware per i file statici
app.use(express.static(path.join(__dirname, 'uploads')));
//http://localhost:3000/images.jpg


// Routes
const routes = require('./routes/User_Router');
app.use(routes)

// middleware
const error = require('./middlewares/Error');
app.use(error.errorHandler)
app.use(error.pageNotFoundHandler);

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        app.listen(process.env.PORT, () => console.log("Server attivo sullaporta ", process.env.PORT))
    }).catch((error) => {
        console.error('Errore nella connessione al DB. Server non avviato.')
    })