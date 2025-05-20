const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    feedname: {
        type: String,
        required:true,
        minlength: 1,
        unique: true
    },
    description:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    subs:[{
        type:mongoose.Schema.Types.ObjectId,
        unique:true,
        ref:'User'
    }],
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]

},{timestamps:true})

module.exports = mongoose.model('Feed', schema)