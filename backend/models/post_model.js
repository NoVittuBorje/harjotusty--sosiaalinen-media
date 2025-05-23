const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    headline:String,
    description:String,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    karma:Number,
    img:String,
    feed:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feed'
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{timestamps:true})

module.exports = mongoose.model('Post', schema)