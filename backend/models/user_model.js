const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    nationality:{
      type:String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    avatar: {
      type: String,
    },
    relationship: {
      type: String,
      enum: ["Single", "Married", "Dating","Other"],
    },
    description: {
      type: String,
    },
    work: {
      type: String,
      enum: ["Working", "Unemployed", "Retired"],
    },
    likedposts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        unique:true,
      },
    ],
    dislikedposts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",

        unique:true,
      },
    ],
    likedcomments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",

        unique:true,
      },
    ],
    dislikedcomments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        unique:true,
      },
    ],
    feedsubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "Feed",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    ownedfeeds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feed",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
