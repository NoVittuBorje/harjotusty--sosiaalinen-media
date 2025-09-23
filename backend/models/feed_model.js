const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

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
    moderators:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    subs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique:true,
    }],
    bannedusers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique:true,
    }],
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    active:{
    type: Boolean,
    default:true
  }

},{timestamps:true})

schema.plugin(uniqueValidator);

module.exports = mongoose.model('Feed', schema)