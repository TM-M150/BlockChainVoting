const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    VoterID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ElectionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
    },

    EncryptedVote: {
      type: String,
      required: true,
    },

    PreviousBlockHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
