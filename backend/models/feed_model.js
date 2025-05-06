const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    feedname: {
        type: String,
        required:true,
        minlength: 6,
        unique: true
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]

},{timestamps:true})

module.exports = mongoose.model('Feed', schema)