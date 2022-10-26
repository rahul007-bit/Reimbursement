import rateLimit from "express-rate-limit";
import config from "../../config/index.js";
import controller from "../../controllers/admin/index.js";
import { adminAuth } from "./auth/auth.js";
const limiter = rateLimit(config.rateLimiter);
import("../../services/admin/createAdmin.js");
export default async (router) => {
  router.post("/admin/sign_up", limiter, controller.signUp);
  router.post("/admin/sign_in", limiter, controller.signIn);
  router.get("/new", (req, res) => {
    res.send("hmm working");
  });
  router.get(
    "/reimburseCount",
    adminAuth,
    limiter,
    controller.getReimburseCount
  );
  router.get(
    "/reimbursement/fullInfo",
    limiter,
    adminAuth,
    controller.getFullReimbursementInfo
  );
  router.get(
    "/reimbursement/allReimbursement",
    adminAuth,
    limiter,
    controller.getFullReimbursement
  );
  router.post(
    "/reimbursement/approve",
    adminAuth,
    limiter,
    controller.approveReimburse
  );

  router.get("/getUser", limiter, adminAuth, controller.getUsers);

  router.post("/addUsers", limiter, adminAuth, controller.addUsers);
};
