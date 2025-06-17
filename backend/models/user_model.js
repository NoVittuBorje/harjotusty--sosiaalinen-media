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
    ref: 'Feed',
    autopopulate: {maxDepth:1}
  }],
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    autopopulate: {maxDepth:3},
  }],
  ownedfeeds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feed",
    autopopulate: {maxDepth:1},
  }],
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    autopopulate: {maxDepth:2}
  }],
  active:{
    type: Boolean,
    default:true
  }
},{timestamps:true})
schema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('User', schema)