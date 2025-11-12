const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
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
    nationality: {
      type: String,
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
    userKarma: { type: Number, default: 0 },
    relationship: {
      type: String,
      enum: ["Single", "Married", "Dating", "Other"],
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
        unique: true,
      },
    ],
    dislikedposts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",

        unique: true,
      },
    ],
    likedcomments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",

        unique: true,
      },
    ],
    dislikedcomments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        unique: true,
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
    chatrooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    chatroominvites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Room",
      }
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    ],
    friendsRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    ],
    friendsRequestsSent: [
            {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
