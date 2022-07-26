import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";

const User_Schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    profile_pic: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", User_Schema);
export default User;
