const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, require: true},
    body: {type: String, require:true},
    date: {type: Date, default: Date.now},
})

const Post = mongoose.model('posts', postSchema);

// Esporto il Model creato
module.exports = Post;