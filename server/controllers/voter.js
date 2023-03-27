import VoterList from "../models/voter.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const create = async function (req, res, next) {
  try {
    const voter = await VoterList.findOne({ Email: req.body.Email });
    if (voter) return next(createError(403, "Already Exists!"));
0
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    const newVoter = new VoterList({
      Email: req.body.Email,
      Password: hash,
      Election_Address: req.body.Election_Address,
    });

    await newVoter.save();
    res.status(200).send("Created Successfully");
  } catch (err) {
    next(err);
  }
};
