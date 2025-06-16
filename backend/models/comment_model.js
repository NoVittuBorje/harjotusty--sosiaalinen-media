const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        autopopulate: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
      },
    content:String,
    replies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: true,
    }],
    replyto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        autopopulate: {maxDepth:1},
    },
    karma:{
        type:Number,
        default:0
    },
    depth:{
        type:Number,
        default: 0
    },
    active:{
    type: Boolean,
    default:true
    }
},{timestamps:true})
schema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Comment', schema)