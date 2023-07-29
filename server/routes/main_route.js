import { Router } from "express";
import glob from "glob";
import config from "../config/index.js";
import rateLimit from "express-rate-limit";
const limit = rateLimit(config.rateLimiter);
import Admin from "../model/admin/model.js";
import User from "../model/user/model.js";
import { default as AdminController } from "../controllers/admin/index.js";
import { default as UserController } from "../controllers/user/index.js";
const router = Router();
import loggers from "../config/logger.js";
import jwt from "jsonwebtoken";
import { celebrate } from "celebrate";
import {
  forgot_password,
  reset_password,
} from "../model/resetPassword/validation.js";

let controllers = glob.sync(`routes/**/index.js`);
controllers.forEach(async (controller) => {
  controller = controller.replace(/routes/, ".");
  const Router = await import(controller);
  await Router.default(router);
});

router.get("/details", limit, async (req, res) => {
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

      const userId = payload.message.userId;

      if (userId) {
        const user = await User.findOne({ _id: payload.message.userId }).select(
          "-password"
        );
        if (user) {
          return res.status(200).send({
            status: 200,
            success: true,
            message: "success",
            data: {
              user: user,
              type: "user",
            },
          });
        }

        return res
          .status(401)
          .json({ message: "User Not found", success: false, status: 401 });
      }

      const id = payload.message.id;
      if (id) {
        const admin = await Admin.findOne({ _id: payload.message.id }).select(
          "-password"
        );
        if (admin) {
          return res.status(200).json({
            data: { user: admin, type: admin.role },
            status: 200,
            success: true,
            message: "success",
          });
        }
      }
      return res
        .status(401)
        .json({ message: "User Not found", success: false, status: 401 });
    } else {
      return res
        .status(401)
        .json({ success: false, status: 401, message: "Token is required" });
    }
  } catch (error) {
    loggers.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/sign_in", limit, AdminController.signIn, UserController.signIn);

router.post(
  "/reset_password",
  limit,
  celebrate(reset_password),
  AdminController.resetPassword,
  UserController.resetPassword
);

router.post(
  "/forgot_password",
  limit,
  celebrate(forgot_password),
  AdminController.forgotPassword,
  UserController.forgotPassword
);

export default router;
