import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";

const Admin_Schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    moodleId: String,
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

// hash the password
Admin_Schema.methods.generate_hash = function generate_hash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
Admin_Schema.methods.valid_password = function valid_password(password) {
  return bcrypt.compareSync(password, this.password);
};

// generate a jwt token and save inside session
Admin_Schema.methods.gen_auth_token = async function gen_auth_token(loginInfo) {
  const expiresIn = "10h";
  try {
    const payload = { loginType: loginInfo.loginType, id: this._id };
    var token = jwt.sign(payload, config.jwtSecret, { expiresIn }); // eslint-disable-line
  } catch (error) {
    logger.error(error);
    throw error;
  }
  // await Session.addSession({ token, id: this._id });
  return token;
};

const Admin = mongoose.model("Admin", Admin_Schema);
export default Admin;
