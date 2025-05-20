const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    unique: true
  },
  email:{
    type:String,
    required: true,
    unique: true,
  },
  password_hash:{
    type: String,
    required: true,
  },
  firstname:{
    type:String,
  },
  lastname:{
    type:String,
  },
  avatar:{
    type:String,
  },
  relationship:{
    type:String,
    enum:["Single","Married","Dating"]
  },
  description:{
    type:String,
  },
  work:{
    type:String,
    enum:["Working","Unemployed","Retired"]
  },
  feedsubs:[{
    type: mongoose.Schema.Types.ObjectId,
    unique:true,
    ref: 'Feed'
  }],
  ownedfeeds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feed"
  }],
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
},{timestamps:true})

module.exports = mongoose.model('User', schema)