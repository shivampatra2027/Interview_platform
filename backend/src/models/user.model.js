import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  clerkId:{
    type:String,
    required:true,
    unique:true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});
export const User = mongoose.model("User", userSchema);