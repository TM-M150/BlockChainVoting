import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      require: true,
    },

    Password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CompanyList", CompanySchema);
