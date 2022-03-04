const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    title: {type: String, required:true},
    text: {type: String, required:true},
    author: {type: String, required:true},
    urlImage: {type: String, required:false},
})

module.exports = mongoose.model('Post', postSchema)

