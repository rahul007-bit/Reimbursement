import { userAuth } from "./auth/userAuth.js";
import rateLimit from "express-rate-limit";
import { celebrate } from "celebrate";
import config from "../../config/index.js";
import controller, { compress, upload } from "../../controllers/user/index.js";
import requestValidator from "../../services/user/requestValidator.js";
import { reimbursementValidator } from "../../services/reimbursement/requestValidation.js";
import multer from "multer";

const limit = rateLimit(config.rateLimiter);

const router = async (router) => {
  router.post(
    "/user/sign_up",
    limit,
    celebrate(requestValidator.signUp),
    controller.signUp
  );

  router.post(
    "/user/sign_in",
    limit,
    celebrate(requestValidator.signIn),
    controller.signIn
  );

  router.post(
    "/user/update_password",
    limit,
    userAuth,
    celebrate(requestValidator.updatePassword),
    controller.updatePassword
  );

  router.post(
    "/user/requestReimburse",
    limit,
    userAuth,
    // celebrate(reimbursementValidator.requestReimbursement),
    controller.applyReimbursement
  );

  router.get(
    "/user/getReimburse",
    limit,
    userAuth,
    controller.viewReimbursement
  );
  router.post(
    "/user/upload/file",
    limit,
    userAuth,
    (req, res, next) => {
      controller.uploadFile(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(400).json({
            message: "File size too large",
          });
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.status(400).json({
            message: "Oops! Something went wrong",
          });
        }

        // Everything went fine.
        next();
      });
    },
    // controller.checkFile,
    controller.uploadFileResponse
  );

  router.post("/file/compress", compress.single("file"), controller.compress);

  router.get("/user/certificate", limit, userAuth, controller.getCertificates);
};
export default router;
