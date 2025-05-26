const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    content:String,
    replies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    replyto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    },
    karma:{
        type:Number
    },
    active:{
    type: Boolean,
    default:true
    }
},{timestamps:true})

module.exports = mongoose.model('Comment', schema)