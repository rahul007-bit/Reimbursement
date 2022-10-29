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

const storage = multerStorage();
export const upload = multer({ storage: storage });
export const compress = multer({ dest: "tmp/" });

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
    console.log(req.body);
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
    "gs -sDEVICE=pdfwrite -dNOPAUSE -dQUIET -dBATCH -dPDFSETTINGS=/ebook -dCompatibilityLevel=1.4 -sOutputFile=" +
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
    cleanupFunction("tmp");
    cleanupFunction("uploads");
    res.download("compress/" + timeStamp + ".pdf");
    cleanupFunction("compress");
    return;
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

export default controller;
