const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//Middleware
// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());
app.use(express.json());

//Middleware Custom
const debug = require('./middlewares/Debug');
app.use(debug.logger);
//app.use(debug.testKeys);

// Routes
const routes = require('./routes/User_Routes');
app.use(routes)

//Middleware Custom
const error = require('./middlewares/Error');
app.use(error.errorHandler);
app.use(error.pageNotFoundHandler);

// async function start() {
//     try{
//         await mongoose.connect(process.env.MONGO_DB)
//         app.listen(process.env.PORT, () => {
//             console.log("Server in ascolto sulla porta", process.env.PORT);
//         })
//     } catch(error) {
//         console.error('Errore nella connessione al DB. Server non avviato');
//     } 
// }
// start();


mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        app.listen(process.env.PORT, () => console.log("Server in ascolto sulla porta", process.env.PORT))
    }).catch((error) => {
        console.error('Errore nella connessione al DB. Server non avviato');
    })