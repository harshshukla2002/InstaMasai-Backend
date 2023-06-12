const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: { type: String, required: true },
    no_of_comments: { type: Number, required: true },
  },
  { versionKey: false }
);

const PostModel = mongoose.model("posts", PostSchema);

module.exports = { PostModel };
