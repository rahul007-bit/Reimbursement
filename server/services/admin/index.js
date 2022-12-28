import Admin from "../../model/admin/model.js";
import logger from "../../config/logger.js";

export const updateProfileAdmin = async ({
  firstName,
  lastName,
  email,
  department,
  admin,
  _id,
}) => {
  try {
    if (admin.role !== "admin") {
      return {
        status: 400,
        message: "You are not authorized to perform this action",
        success: false,
      };
    }
    const user = await Admin.findOne({
      _id: _id,
    });
    if (!user) {
      return {
        status: 404,
        message: "User not found",
        success: false,
      };
    }

    firstName ? (user.first_name = firstName) : null;
    lastName ? (user.last_name = lastName) : null;
    email ? (user.email = email) : null;
    department ? (user.department = department) : null;
    await user.save();
    return {
      status: 200,
      message: "Profile updated successfully",
      success: true,
    };
  } catch (error) {
    logger.error(error);
    return {
      status: 500,
      message: error.message,
      success: false,
    };
  }
};

export const updatePasswordAdmin = async (loginUser, { id, password }) => {
  try {
    if (loginUser.role !== "admin" && loginUser._id.toString() !== id) {
      return {
        status: 400,
        message: "You are not authorized to perform this action",
        success: false,
      };
    }
    const user = await Admin.findOne({
      _id: id,
    });
    if (!user) {
      return {
        status: 404,
        message: "User not found",
        success: false,
      };
    }

    const newAdmin = new Admin();
    user.password = await newAdmin.generateHash(password);
    await user.save();
    return {
      status: 200,
      message: "Password updated successfully",
      success: true,
    };
  } catch (error) {
    logger.error(error);
    return {
      status: 500,
      message: error.message,
      success: false,
    };
  }
};
