const mongoose = require('mongoose');

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
// Model mi permette di creare un oggetto per definire la collection di riferimento e lo schema da utilizzare
const User = mongoose.model('users', userSchema);

// Esporto il Model creato
module.exports = User;