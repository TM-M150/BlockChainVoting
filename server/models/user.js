import mongoose from "mongoose";

const VoterSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
    },

    Email: {
      type: String,
      require: true,
    },

    Password: {
      type: String,
      require: true,
    },

    PublicKey: {
      type: String,
      require: true,
    },

    PrivateKey: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", VoterSchema);
