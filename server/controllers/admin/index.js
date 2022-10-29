import config from "../../config/index.js";
import Admin from "../../model/admin/model.js";

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
    const haspassword = await newAdmin.generate_hash(password);
    await Admin.create({
      moodleId: moodleId,
      password: haspassword,
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

    const responseData = {
      name: admin.name,
    };

    const token = admin.gen_auth_token();
    return res.status(200).json({
      status: 200,
      data: responseData,
      success: true,
      message: "Login Successful",
      auth_token: token,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

controller.updateProfile = async (req, res) => {};
controller.viewProfile = async (req, res) => {};
controller.applyReimbursement = async (req, res) => {};
controller.viewReimbursement = async (req, res) => {};
controller.deleteReimbursement = async (req, res) => {};

export default controller;
