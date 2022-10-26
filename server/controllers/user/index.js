import config from "../../config/index.js";
import {
  createReimbursement,
  getReimbursement,
} from "../../services/reimbursement/index.js";
import User from "../../model/user/model.js";

const controller = Object.create(null); // {}
controller.signUp = async (req, res) => {
  try {
    const { moodleId, password, firstName, lastName } = req.body;

    const user = await User.findOne({ moodleId: moodleId });
    if (user) {
      return res.status(400).send({
        success: true,
        message: "User already exists with provided moodle Id",
      });
    } else {
      const newUser = new User();
      const hashPassword = newUser.generate_hash(password);
      await User.create({
        first_name: firstName,
        last_name: lastName,
        moodleId: moodleId,
        password: hashPassword,
      });
      return res
        .status(201)
        .send({ success: true, message: "SignUp successful" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

controller.signIn = async (req, res) => {
  try {
    const { moodleId, password } = req.body;
    const user = await User.findOne({ moodleId: moodleId });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid credential provided" });
    } else {
      if (await user.valid_password(password)) {
        const userData = {};
        userData.username = user.username;
        userData.profile_pic = user.profile_pic;
        const token = await user.gen_auth_token();
        return res.send({
          success: true,
          message: "Login successfully",
          userData: userData,
          type:"user",
          auth_token: token,
        });
      } else {
        return res
          .status(404)
          .send({ success: false, message: "Invalid credential provided" });
      }
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

controller.updateProfile = async (req, res) => {};
controller.viewProfile = async (req, res) => {};
controller.applyReimbursement = async (req, res) => {
  try {
    const user_id = req.userId;
    const department = req.user.department;
    const {
      certificate_name,
      bankDetails,
      amountToReimbursement,
      additionalDetails,
      certificateUrl,
      // recipientUrl,
    } = req.body;
    const result = await createReimbursement({
      certificate_name,
      user_id,
      bankDetails,
      amountToReimbursement,
      department,
      additionalDetails,
      // recipientUrl,
      certificateUrl,
    });
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: error.message, status: 500 });
  }
};

controller.viewReimbursement = async (req, res) => {
  try {
    const query = req.query;
    query.userId = req.userId;
    const result = await getReimbursement(query);
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};
controller.deleteReimbursement = async (req, res) => {};

export default controller;
