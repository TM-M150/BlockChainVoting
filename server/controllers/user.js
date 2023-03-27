import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { createError } from "../utils/error.js";

const registerUser = async function (req, res, next) {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ Email: req.body.Email });
    if (existingUser) return next(createError(403, "Already Exists!"));

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    // Create a new user
    const newUser = new User({
      Name: req.body.Name,
      Email: req.body.Email,
      Password: hash,
      PublicKey: "XXXXXXXXXXXXXX", // Replace with generated public key
      PrivateKey: "XXXXXXXXXXXXXX", // Replace with generated private key
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    res.status(200).json("User created successfully");
  } catch (error) {
    // Handle errors
    next(error);
  }
};

export { registerUser };
