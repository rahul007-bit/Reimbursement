import Admin from "../../model/admin/model.js";
import {
  approveReimbursement,
  getFullReimbursement,
  getFullReimbursementInfo,
  getReimbursement,
  getReimbursementsCertificateStatusCount,
  ReimbursementCount,
} from "../../services/reimbursement/index.js";

import {
  createUser,
  getUser,
  removeUser,
  updateUser,
  updateUserPassword,
} from "../../services/user/index.js";
import logger from "../../config/logger.js";

import {
  createCertificate,
  deleteCertificate,
  getCertificates,
  updateCertificate,
} from "../../services/certification/index.js";
import {
  updateProfileAdmin,
  updatePasswordAdmin,
} from "../../services/admin/index.js";

import sendMail, { generateLoginCode } from "../../services/mail/sendMail.js";
import config from "../../config/index.js";
import { sendForgotCode } from "../../functions/sendForgotCode.js";
import ResetPassword from "../../model/resetPassword/index.js";

const controller = Object.create(null); // {}

controller.signUp = async (req, res) => {
  try {
    const { subAdmins, receptionists } = req.body;

    if (subAdmins) {
      if (subAdmins.length < 0) {
        return res.status(401).json({
          success: false,
          status: 400,
          message: "At least one Head Of Departement is required",
        });
      }
      let isValid = true;
      for (const [index, subAdmin] of subAdmins.entries()) {
        const {
          moodleId,
          password,
          first_name,
          last_name,
          role,
          email,
          department,
        } = subAdmin;

        const admin = await Admin.findOne({ moodleId: moodleId });

        if (admin) {
          res.status(400).json({
            success: false,
            message: `User Already Exist with provided Institute Id ${moodleId}. We have added ${index} Head Of Departements`,
            status: 400,
          });
          isValid = false;
          break;
        }
        const newAdmin = new Admin();
        const hashPassword = await newAdmin.generate_hash(password);
        await Admin.create({
          moodleId: moodleId,
          password: hashPassword,
          first_name,
          last_name,
          role: role,
          email: email,
          department: department,
        });
      }

      if (isValid) {
        return res.status(200).json({
          success: true,
          message: "All Head Of Departement are Added successfully",
        });
      }
    } else if (receptionists) {
      if (receptionists.length < 0) {
        return res.status(401).json({
          success: false,
          status: 400,
          message: "At least one receptionist is required",
        });
      }

      let isValid = true;

      for (const [index, receptionist] of receptionists.entries()) {
        const {
          moodleId,
          password,
          first_name,
          last_name,
          role,
          email,
          department,
        } = receptionist;

        const admin = await Admin.findOne({ moodleId: moodleId });

        if (admin) {
          res.status(400).json({
            success: false,
            message: `User Already Exist with provided Institute Id ${moodleId}. We have added ${index} receptionist`,
            status: 400,
          });
          isValid = false;
          break;
        }

        const newAdmin = new Admin();
        const hashPassword = await newAdmin.generate_hash(password);
        await Admin.create({
          moodleId: moodleId,
          password: hashPassword,
          first_name: first_name,
          last_name: last_name,
          role: role,
          email: email,
          department: department,
        });
      }

      if (isValid) {
        return res.status(200).json({
          success: true,
          message: "All receptionist are Added successfully",
        });
      }
    } else {
      const {
        moodleId,
        email,
        password,
        firstName,
        lastName,
        role,
        department,
      } = req.body;

      if (role === "admin") {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "You are not allowed to create admin",
        });
      }

      if (moodleId && password && firstName && lastName && role && email) {
        const admin = await Admin.findOne({ moodleId: moodleId });

        if (admin) {
          return res.send({
            success: false,
            message: `User Already Exist with provided Institute Id ${moodleId}`,
          });
        } else {
          const newAdmin = new Admin();
          const hashPassword = await newAdmin.generate_hash(password);
          await Admin.create({
            moodleId: moodleId,
            password: hashPassword,
            first_name: firstName,
            last_name: lastName,
            role: role,
            department: department,
            email,
          });

          return res.send({
            message: "User Enrolled Successfully",
            success: true,
          });
        }
      } else {
        return res.send({
          message: "Please provide all the details",
          success: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

controller.signIn = async (req, res, next) => {
  try {
    const { moodleId, password } = req.body;
    const admin = await Admin.findOne({ moodleId: moodleId });
    if (!admin) {
      return next();
      // return res.status(400).json({
      //   success: false,
      //   message: "Invalid Admin credentials!",
      //   status: 400,
      // });
    }

    if (!admin.valid_password(password)) {
      // return next();
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
      type: admin.role,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

controller.updatePassword = async (req, res) => {
  const { newPassword, oldPassword } = req.body;

  const loginUser = req.user;
  try {
    const result = await updatePasswordAdmin(loginUser, {
      password: newPassword,
      id: loginUser._id,
      oldPassword,
    });
    return res.status(result.status).send(result);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

controller.forgotPassword = async (req, res, next) => {
  const { id } = req.body;
  try {
    const admin = await Admin.findOne({ moodleId: id });
    if (!admin) {
      return next();
    }
    const result = await sendForgotCode(admin);
    return res.status(result.status).send(result);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

controller.resetPassword = async (req, res, next) => {
  const { id, code, password } = req.body;
  try {
    const admin = await Admin.findOne({ moodleId: id });
    if (!admin) {
      return next();
    }
    const resetPassword = await ResetPassword.findOne({ moodleId: id });
    if (!resetPassword) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Code",
        success: false,
      });
    }
    if (resetPassword.resetCode !== code) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Code",
        success: false,
      });
    }

    const newAdmin = new Admin();
    const hashPassword = await newAdmin.generate_hash(password);
    await Admin.updateOne(
      { _id: admin._id },
      { $set: { password: hashPassword } }
    );
    // delete reset code
    await ResetPassword.deleteMany({ moodleId: id });

    return res.status(200).json({
      status: 200,
      message: "Password Reset Successfully",
      success: true,
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
    const get = req.query;
    if (req.user.role !== "admin") {
      get["department"] = req.user.department;
    }
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
    const { reimburse_id, assignedTo, isApproved, remarks } = req.body;
    const admin = req.user;
    const result = await approveReimbursement({
      reimburse_id,
      admin,
      assignedTo,
      isApproved,
      remarks,
    });
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
    const query = req.query;
    if (req.user.role !== "admin") {
      query["department"] = req.user.department;
    }
    const result = await getUser(query);
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

controller.getReceptionist = async (req, res) => {
  try {
    const result = await Admin.find({ role: "receptionist" }).select(
      "first_name last_name email role department moodleId"
    );
    if (result) {
      return res.status(200).send({
        status: 200,
        message: "Accountant fetched successfully",
        success: true,
        data: result,
      });
    } else {
      return res.status(200).send({
        status: 200,
        message: "No Accountant found",
        success: false,
        data: [],
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.getSubAdmin = async (req, res) => {
  try {
    const result = await Admin.find({ role: "sub_admin" }).select(
      "first_name last_name email role department moodleId"
    );
    if (result) {
      return res.status(200).send({
        status: 200,
        message: "Admin fetched successfully",
        success: true,
        data: result,
      });
    } else {
      return res.status(200).send({
        status: 200,
        message: "No Admin found",
        success: true,
        data: [],
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.deleteAdmin = async (req, res) => {
  try {
    const { admin_id } = req.body;
    const result = await Admin.deleteOne({
      _id: admin_id,
    });
    if (result.deletedCount !== 0) {
      return res.status(200).send({
        status: 200,
        message: "Deleted successfully",
        success: true,
      });
    }
    return res.status(404).send({
      status: 404,
      message: "User not found",
      success: false,
    });
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
    const { users, user } = req.body;
    const result = await createUser(users, user);
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

controller.getReimbursementsCertificateStatusCount = async (req, res) => {
  try {
    const result = await getReimbursementsCertificateStatusCount();
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};

controller.createCertificate = async (req, res) => {
  try {
    const { certificate_name, questions } = req.body;
    const result = await createCertificate({
      certificate_name,
      questions,
    });
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};

controller.getCertificates = async (req, res) => {
  try {
    const query = req.query;
    const result = await getCertificates(query);
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};

controller.updateCertificate = async (req, res) => {
  try {
    const { certificate_id, certificate_name, questions } = req.body;
    const result = await updateCertificate({
      certificate_id,
      certificate: {
        certificate_name,
        questions,
      },
    });
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};

controller.deleteCertificate = async (req, res) => {
  try {
    const { certificate_id } = req.body;
    const result = await deleteCertificate(certificate_id);
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};

controller.getCertificatesReceptionist = async (req, res) => {
  try {
    const query = req.query;
    query.approvedBySubAdmin = true;
    query.approvedByAdmin = true;
    query.assignedToReimburse = req.userId;

    const result = await getReimbursement(query);
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};

controller.approveReimburseReceptionist = async (req, res) => {
  try {
    const { reimburse_id, remarks, isApproved } = req.body;
    const admin = req.user;
    const result = await approveReimbursement({
      reimburse_id,
      admin,
      remarks,
      isApproved,
    });
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

controller.updateProfileAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, department, _id } = req.body;
    const admin = req.user;
    const result = await updateProfileAdmin({
      firstName,
      lastName,
      email,
      department,
      admin,
      _id,
    });
    return res.status(result.status).send(result);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.updateProfileUser = async (req, res) => {
  try {
    const { firstName, lastName, email, department, _id } = req.body;
    const admin = req.user;
    const result = await updateUser(admin, {
      firstName,
      lastName,
      email,
      department,
      _id,
    });
    return res.status(result.status).send(result);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.updateUserPassword = async (req, res) => {
  try {
    const { password, id } = req.body;
    const loggedInUser = req.user;
    const result = await updateUserPassword(loggedInUser, { id, password });
    return res.status(result.status).send(result);
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

controller.deleteReimbursement = async (req, res) => {};

export default controller;
