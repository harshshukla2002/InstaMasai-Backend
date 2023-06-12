const mongoose = require("mongoose");

const BlacklistSchema = mongoose.Schema(
  {
    token: { type: String, required: true },
  },
  { versionKey: false }
);

const BlacklistModel = mongoose.model("blacklists", BlacklistSchema);

module.exports = { BlacklistModel };
