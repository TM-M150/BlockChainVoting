import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// LOAD CONFIG
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

//MIDDLEWARES
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`)
);