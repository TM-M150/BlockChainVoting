import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { createError } from "../utils/error.js";
import { generateKeyPair } from "../utils/keygen.js";

export const registerUser = async function (req, res, next) {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ Email: req.body.Email });
    if (existingUser) return next(createError(403, "Already Exists!"));

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    // Generate a new key pair
    const { publicKey, privateKey } = generateKeyPair();

    // Create a new user
    const newUser = new User({
      Name: req.body.Name,
      Email: req.body.Email,
      Password: hash,
      PublicKey: publicKey,
      PrivateKey: privateKey,
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

export const loginUser = async function (req, res, next) {
  try {
    // Find the user in the database by email
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) return next(createError(401, "Invalid email or password"));

    // Compare the password hash with the input password
    const passwordMatch = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!passwordMatch)
      return next(createError(401, "Invalid email or password"));

    // Generate a JWT token
    const token = jwt.sign({ UserId: user.UserId }, process.env.JWT);

    // Return the token in the response
    res.status(200).json({ token });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

export const updateUser = async function (req, res, next) {
  try {
    // Find the user in the database by ID
    const user = await User.findById(req.params.userId);
    if (!user) return next(createError(404, "User not found"));

    // Update user's name and email
    user.Name = req.body.Name;
    user.Email = req.body.Email;

    // Save the updated user to the database
    await user.save();

    // Return success response
    res.status(200).json(user);
  } catch (error) {
    // Handle errors
    next(error);
  }
};

export const getUser = async function (req, res, next) {
  try {
    // Find the user in the database by ID
    const user = await User.findById(req.params.userId);
    if (!user) return next(createError(404, "User not found"));

    // Return user data in the response
    res.status(200).json(user);
  } catch (error) {
    // Handle errors
    next(error);
  }
};

export const deleteUser = async function (req, res, next) {
  try {
    // Find the user in the database by ID
    const user = await User.findById(req.params.userId);
    if (!user) return next(createError(404, "User not found"));

    // Delete the user from the database
    await user.deleteOne();

    // Return success response
    res.status(200).json("User deleted successfully");
  } catch (error) {
    // Handle errors
    next(error);
  }
};
