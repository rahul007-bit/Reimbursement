import config from "../../config/index.js";
import {
  createReimbursement,
  getReimbursement,
} from "../../services/reimbursement/index.js";
import User from "../../model/user/model.js";
import multer from "multer";
import multerStorage from "../../config/multerStorage.js";
import fs from "fs";
import { exec } from "child_process";
import path from "path";
import { getCertificates } from "../../services/certification/index.js";
import { createUser, updateUserPassword } from "../../services/user/index.js";
import { sendForgotCode } from "../../functions/sendForgotCode.js";
import ResetPassword from "../../model/resetPassword/index.js";

const storage = multerStorage();
export const upload = multer({ storage: storage });
export const compress = multer({ dest: "tmp/" });

const controller = Object.create(null); // {}

controller.signUp = async (req, res) => {
  try {
    const { user } = req.body;
    const result = await createUser(null, user);
    return res.status(result.status).json(result);
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
          type: "user",
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

controller.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const loginUser = req.user;
    const result = await updateUserPassword(loginUser, {
      password: newPassword,
      oldPassword,
      id: loginUser._id.toString(),
    });
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

controller.forgotPassword = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOne({ moodleId: id });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid credential provided" });
    }
    const result = await sendForgotCode(user);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

controller.resetPassword = async (req, res) => {
  const { id, code, password } = req.body;
  try {
    const user = await User.findOne({ moodleId: id });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid credential provided" });
    }
    const result = await ResetPassword.findOne({
      user: user._id,
      resetCode: code,
    });
    if (!result) {
      return res.status(404).send({ success: false, message: "Invalid Token" });
    }
    const newUser = new User();
    const hashPassword = await newUser.generate_hash(password);

    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashPassword } }
    );
    await ResetPassword.deleteOne({ _id: result._id });

    return res.json({
      success: true,
      message: "Password reset successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

controller.applyReimbursement = async (req, res) => {
  try {
    const user_id = req.userId;
    const department = req.user.department;
    const email = req.user.email;
    const {
      certificate_id,
      bankDetails,
      amountToReimburse,
      reimbursementDetails,
      certificateUrl,
    } = req.body;
    reimbursementDetails.email = email;
    const result = await createReimbursement({
      certificate_id,
      user_id,
      bankDetails,
      amountToReimburse,
      reimbursementDetails,
      certificateUrl,
      department,
      email,
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

controller.checkFile = async (req, res, next) => {
  try {
    if (req.headers["content-length"] / (1024 * 1024) > 1) {
      return res.status(400).json({
        message: "File size should be less than 1Mb",
        success: false,
        status: 400,
      });
    }
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};
controller.uploadFile = upload.single("file");
controller.uploadFileResponse = async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    if (file) {
      const response = {
        success: true,
        message: "File uploaded successfully",
        data: {
          url: file.details.Location,
          filename: file.originalname,
          type: file.mimetype,
        },
      };
      return res.status(200).json(response);
    }
    return res.status(501).json({
      success: false,
      message: "Oops failed to upload file",
      status: 501,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};

// controller.compressFile =

controller.compress = async (req, res) => {
  if (!fs.existsSync(process.cwd() + "/compress/")) {
    fs.mkdir(process.cwd() + "/compress", (err) => {
      // => [Error: EPERM: operation not permitted, mkdir 'C:\']);
      console.log(err);
    });
  }
  if (!fs.existsSync(process.cwd() + "/uploads/")) {
    fs.mkdir(process.cwd() + "/uploads", (err) => {
      // => [Error: EPERM: operation not permitted, mkdir 'C:\']);
      console.log(err);
    });
  }

  console.log(req.file);
  const timeStamp = new Date().toISOString();
  const tmp_path = req.file.path; //     	 tmp/filename
  const target_path = "uploads/" + req.file.originalname.replace(/\s/g, "");
  const src = fs.createReadStream(tmp_path);
  const dest = fs.createWriteStream(target_path);
  src.pipe(dest);

  const command =
    "gs -sDEVICE=pdfwrite -dNOPAUSE -dQUIET -dBATCH -dPDFSETTINGS=/screen -dCompatibilityLevel=1.4 -sOutputFile=" +
    "compress/" +
    timeStamp +
    ".pdf " +
    "uploads/" +
    req.file.originalname.replace(/\s/g, "");
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
    if (stderr) {
      console.log(stderr);
    }
    console.log(stdout);
    res.download("compress/" + timeStamp + ".pdf");
    cleanupFunction("compress");
    cleanupFunction("tmp");
    cleanupFunction("uploads");
  });
};

const cleanupFunction = (folder) => {
  fs.readdir(folder, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(folder, file), (err) => {
        if (err) console.log(err);
      });
    }
  });
};

controller.getCertificates = async (req, res) => {
  try {
    const query = req.query;
    query.userId = req.userId;
    const result = await getCertificates(query);
    return res.status(result.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};
export default controller;
