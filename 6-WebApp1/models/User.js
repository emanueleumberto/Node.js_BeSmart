const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {type: String, require: true},
    body: {type: String, require: true},
    date: {type: Date, default: Date.now}
})
const Post = mongoose.model('posts', postSchema);

// Schema Mongoose
// Lo schema sarà la struttura che deve avere ogni oggetto che salverò nella Collection di Mongo DB
const userSchema = new mongoose.Schema({
    firstname: {type: String, require: true}, 
    lastname: {type: String, require: true}, 
    age: {type: Number, require: true, default: 18}, 
    email: {type: String, require: true, unique: true},
    address: {
        city: {type: String, require: true},
        state: {type: String, require: true}
    },
    posts: [
        {type: mongoose.Schema.ObjectId, ref: 'Post'}
    ],
    createdAt: {type: Date, default: Date.now}

});

// Model Mongoose
// Model mi permette di creare un oggetto per definire la collection di riferimento e lo schema da utilizzare
const User = mongoose.model('users', userSchema);

// Esporto il Model creato
module.exports = User;