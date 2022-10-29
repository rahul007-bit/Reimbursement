import config from "../../config/index.js";
import Admin from "../../model/admin/model.js";
import {
  approveReimbursement,
  getFullReimbursement,
  getFullReimbursementInfo,
  getReimbursement,
  ReimbursementCount,
} from "../../services/reimbursement/index.js";
import { createUser, getUser, removeUser } from "../../services/user/index.js";
import logger from "../../config/logger.js";

const controller = Object.create(null); // {}
controller.signUp = async (req, res) => {
  const { moodleId, password, firstName, lastName } = req.body;
  const admin = await Admin.findOne({ moodleId: moodleId });
  console.log(admin);
  if (admin) {
    return res.send({
      success: false,
      message: "User Already Exist with provided Moodle Id",
    });
  } else {
    const newAdmin = new Admin();
    const hashpassword = await newAdmin.generate_hash(password);
    await Admin.create({
      moodleId: moodleId,
      password: hashpassword,
      firstName: firstName,
      lastName: lastName,
    });
    return res.send({ message: "Creating" });
  }
};
controller.signIn = async (req, res) => {
  try {
    const { moodleId, password } = req.body;
    const admin = await Admin.findOne({ moodleId: moodleId });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Admin credentials!",
        status: 400,
      });
    }

    if (!admin.valid_password(password)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Admin credentials!",
        status: 400,
      });
    }

    const token = await admin.gen_auth_token();
    return res.status(200).json({
      status: 200,
      data: admin,
      success: true,
      message: "Login Successful",
      auth_token: token,
      type: "admin",
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

controller.getReimburseCount = async (req, res) => {
  try {
    const get = req.query.get;
    const result = await ReimbursementCount(get);
    return res.status(result.status).send(result);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.getFullReimbursementInfo = async (req, res) => {
  try {
    const get = req.query.get;
    const result = await getFullReimbursementInfo(get);
    return res.status(result.status).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.getFullReimbursement = async (req, res) => {
  try {
    const result = await getFullReimbursement();
    return res.status(result.status).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.approveReimburse = async (req, res) => {
  try {
    const { reimburse_id } = req.body;
    const result = await approveReimbursement(reimburse_id);
    return res.status(result.status).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.getUsers = async (req, res) => {
  try {
    const result = await getUser();
    return res.status(result.status).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};
controller.addUsers = async (req, res) => {
  try {
    const { users } = req.body;
    const result = await createUser(users);
    return res.status(result.status).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.removeUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await removeUser(user_id);
    return res.status(result.status).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.viewReimbursement = async (req, res) => {
  try {
    const query = req.query;
    const result = await getReimbursement(query);
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};


controller.updateProfile = async (req, res) => {};
controller.viewProfile = async (req, res) => {};
controller.applyReimbursement = async (req, res) => {};

controller.deleteReimbursement = async (req, res) => {};



export default controller;
