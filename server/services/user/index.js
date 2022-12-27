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

    const user = await User.find(params);

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
