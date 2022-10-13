import logger from "../../config/logger.js";
import User from "../../model/user/model.js";

export const createUser = async (users) => {
  try {
    for (const user of users) {
      const hashPass = new User();
      user.password = hashPass.generate_hash(user.password);
      await User.create({
        first_name: user.first_name,
        password: user.password,
        last_name: user.last_name,
        department: user.department,
        moodleId: user.moodleId,
        email: user.email,
      });
    }
    return {
      status: 200,
      message: "User Added Successfully!",
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

export const getUser = async () => {
  try {
    const user = await User.find();
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
