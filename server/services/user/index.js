import logger from "../../config/logger.js";
import User from "../../model/user/model.js";

export const createUser = async (users, user) => {
  try {
    if (users) {
      if (users.length < 0) {
        return {
          status: 400,
          success: false,
          message: "Please provide a valid user",
        };
      }
      let isValid = true;
      let message = {};

      for (const [index, user] of users.entries()) {
        const { first_name, last_name, moodleId, email, password, department } =
          user;
        const userExist = await User.findOne({ moodleId: moodleId });
        if (userExist) {
          isValid = false;
          message = {
            status: 400,
            success: false,
            message: `User with moodleId ${moodleId} already exist. We have added ${index} users`,
          };
          break;
        }
        const newUser = new User();
        const hashPassword = await newUser.generate_hash(password);
        await User.create({
          first_name,
          last_name,
          moodleId,
          email,
          password: hashPassword,
          department,
        });
      }
      if (isValid) {
        return {
          status: 200,
          success: true,
          message: "User Created Successfully!",
        };
      }
      return message;
    }
    if (user) {
      const {
        firstName,
        lastName,
        moodleId,
        password,
        email,
        type,
        department,
      } = user;
      const isUserExist = await User.find({ moodleId: moodleId });
      console.log(isUserExist);
      if (isUserExist.length) {
        return {
          status: 400,
          success: false,
          message: `User already exist with moodleId ${moodleId}`,
        };
      }

      const newUser = new User();
      const hashedPassword = newUser.generate_hash(password);
      newUser.moodleId = moodleId;
      newUser.first_name = firstName;
      newUser.last_name = lastName;
      newUser.email = email;
      newUser.password = hashedPassword;
      newUser.type = type;
      newUser.department = department;
      await newUser.save();

      return {
        status: 200,
        success: true,
        message: `User ${firstName} is successfully enrolled!`,
      };
    }
    return {
      status: 400,
      success: false,
      message: "Please provide required user details",
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

export const getUser = async (query) => {
  try {
    const params = {};
    if (query.moodleId) {
      params.moodleId = query.moodleId;
    }
    if (query.email) {
      params.email = query.email;
    }
    if (query.department) {
      params.department = query.department;
    }
    if (query.type) {
      params.type = query.type;
    }
    if (query.first_name) {
      params.first_name = query.first_name;
    }
    if (query.last_name) {
      params.last_name = query.last_name;
    }

    const user = await User.find(params).select("-password");

    return {
      user: user,
      status: 200,
      success: true,
      message: "Here We go!",
    };
  } catch (error) {
    logger.error(error);
    return {
      status: 500,
      success: false,
      message: error.message,
    };
  }
};

export const updateUser = async (
  admin,
  { firstName, lastName, email, department, _id }
) => {
  try {
    if (
      admin.role !== "admin" &&
      admin.role !== "sub_admin" &&
      admin._id.toString() !== _id
    ) {
      return {
        status: 400,
        message: "You are not authorized to perform this action",
        success: false,
      };
    }

    const user = await User.findOne({
      _id: _id,
    });
    if (!user) {
      return {
        status: 404,
        message: "User not found",
        success: false,
      };
    }
    if (
      (admin.role !== "admin" || admin.role !== "sub_admin") &&
      user.department !== department
    ) {
      return {
        status: 400,
        message: "You are not allowed to change department",
        success: false,
      };
    }
    user.first_name = firstName;
    user.last_name = lastName;
    user.email = email;
    user.department = department;

    await user.save();
    return {
      status: 200,
      message: "User updated successfully",
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

export const updateUserPassword = async (loginUser, { id, password }) => {
  try {
    if (
      loginUser.role !== "admin" ||
      loginUser.role !== "sub_admin" ||
      loginUser._id !== id
    ) {
      return {
        status: 400,
        message: "You are not authorized to perform this action",
        success: false,
      };
    }
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      return {
        status: 404,
        message: "User not found",
        success: false,
      };
    }
    const newUser = new User();
    user.password = await newUser.generate_hash(password);
    await user.save();

    return {
      status: 200,
      message: "User password updated successfully",
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

export const removeUser = async (id) => {
  try {
    const result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return {
        status: 400,
        success: false,
        message: "User not found!",
      };
    }
    return {
      status: 200,
      success: true,
      message: "User Removed Successfully!",
    };
  } catch (error) {
    logger.error(error);
    return {
      status: 500,
      success: false,
      message: error.message,
    };
  }
};
