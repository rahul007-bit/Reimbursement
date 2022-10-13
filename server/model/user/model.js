import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import logger from "../../config/logger.js";
import config from "../../config/index.js";

const User_Schema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    moodleId: String,
    password: String,
    profile_pic: String,
    department: String,
    year: String,
    type: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// hash the password
User_Schema.methods.generate_hash = function generate_hash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
User_Schema.methods.valid_password = function valid_password(password) {
  return bcrypt.compareSync(password, this.password);
};

// generate a jwt token and save inside session
User_Schema.methods.gen_auth_token = async function gen_auth_token(loginInfo) {
  const expiresIn = "10h";
  let token;
  try {
    const payload = { userId: this._id };
    token = jwt.sign(payload, config.jwtSecret); // eslint-disable-line
  } catch (error) {
    logger.error(error);
    throw error;
  }
  // await Session.addSession({ token, id: this._id });
  return token;
};

const User = mongoose.model("User", User_Schema);
export default User;
