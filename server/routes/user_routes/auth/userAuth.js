import jwt from "jsonwebtoken";
import config from "../../../config/index.js";
import loggers from "../../../config/logger.js";
import User from "../../../model/user/model.js";
export const userAuth = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  try {
    if (token) {
      const jwtSecret = config.jwtSecret;
      const payload = await jwt.verify(
        token,
        jwtSecret,
        async (error, payload) => {
          if (error) {
            return { success: false, message: error.message };
          } else {
            return { success: true, message: payload };
          }
        }
      );
      if (!payload.success) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token", status: 401 });
      }
      req.userId = payload.message.userId;
      const user = await User.findOne({ _id: payload.message.userId });
      if (user) {
        req.user = user;
        next();
      } else {
        return res
          .status(401)
          .json({ message: "User Not found", success: false, status: 401 });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, status: 401, message: "Token is required" });
    }
  } catch (error) {
    loggers.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
