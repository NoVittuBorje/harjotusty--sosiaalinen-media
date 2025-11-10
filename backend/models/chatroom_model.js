const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    type:{
      type:String,
      enum:["GROUP","FEED","PRIVATE"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model('Room', schema);