// This file is same as the adminAuth.js file except the role check is changed to "receptionist"

import jwt from "jsonwebtoken";
import config from "../../../config/index.js";
import loggers from "../../../config/logger.js";
import Admin from "../../../model/admin/model.js";
export const receptionistAuth = async (req, res, next) => {
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
      req.userId = payload.message.id;
      const user = await Admin.findOne({ _id: payload.message.id });
      if (user) {
        // check if role is receptionist or admin
        if (user.role !== "receptionist" && user.role !== "admin") {
          return res.status(401).json({
            success: false,
            message: "You are not authorized to access this route",
            status: 401,
          });
        }
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
//
