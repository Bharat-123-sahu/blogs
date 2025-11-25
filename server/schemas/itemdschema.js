import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
  name: String,
  age: Number,
  detail: String,
  number: Number,
  professional: String,
});
