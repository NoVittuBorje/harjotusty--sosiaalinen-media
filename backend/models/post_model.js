const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    headline: String,
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    karma: Number,
    commentsCount: { type: Number, default: 0 },
    img: String,
    feed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feed",
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    locked: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", schema);
