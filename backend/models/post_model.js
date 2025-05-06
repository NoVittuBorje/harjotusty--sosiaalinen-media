const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    headline:String,
    text:String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    karma:Number,
    img:String,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{timestamps:true})

module.exports = mongoose.model('Post', schema)