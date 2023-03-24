import mongoose from "mongoose";

const VoterSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      require: true,
    },

    Password: {
      type: String,
      require: true,
    },

    Election_Address: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("VoterList", VoterSchema);
