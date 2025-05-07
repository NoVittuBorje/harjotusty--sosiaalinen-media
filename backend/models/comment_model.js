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
},{timestamps:true})

module.exports = mongoose.model('Comment', schema)