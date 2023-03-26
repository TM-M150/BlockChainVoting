const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },

  Party: {
    type: String,
    required: true,
  },

  Manifesto: {
    type: String,
    required: true,
  },

  Votes: {
    type: Number,
    default: 0,
  },

  Image: {
    type: String,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
