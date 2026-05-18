const mongoose = require('mongoose');

// Schema Mongoose
const userSchema = new mongoose.Schema({
    firstname: {type: String, require: true}, 
    lastname: {type: String, require: true}, 
    age: {type: Number, require: true}, 
    email: {type: String, require: true}, 
    createdAt: {type: Date, default: Date.now}
});

// Model Mongoose
const User = mongoose.model('users', userSchema);

// Esporto il Model creato
module.exports = User;