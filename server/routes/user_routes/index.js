import { userAuth } from "./auth/userAuth.js";
import rateLimit from "express-rate-limit";
import { celebrate } from "celebrate";
import config from "../../config/index.js";
import controller from "../../controllers/user/index.js";
import requestValidator from "../../services/user/requestValidator.js";
const limit = rateLimit(config.rateLimiter);
import { reimbursementValidator } from "../../services/reimbursement/requestValidation.js";

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
    "/user/requestReimburse",
    limit,
    userAuth,
    celebrate(reimbursementValidator.requestReimbursement),
    controller.applyReimbursement
  );

  router.get(
    "/user/getReimburse",
    limit,
    userAuth,
    controller.viewReimbursement
  );

  // router.get("/user/details", limit, userAuth, controller.viewProfile);
};
export default router;
