import jwt from "jsonwebtoken";
import config from "../../../config/index.js";
import { loggers } from "winston";

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
        return req
          .status(401)
          .json({ success: false, message: payload.message });
      }
      req.userId = payload.message.userId;
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Token is required" });
    }
  } catch (error) {
    loggers.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
