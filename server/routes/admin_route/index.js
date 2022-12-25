import { celebrate } from "celebrate";
import rateLimit from "express-rate-limit";
import config from "../../config/index.js";
import controller from "../../controllers/admin/index.js";
import { adminAuth } from "./auth/auth.js";
import { receptionistAuth } from "./auth/receptionistAuth.js";
import { subAdminAuth } from "./auth/subAdminAuth.js";

import { sub_admin, receptionist } from "../../services/admin/validator.js";

const limiter = rateLimit(config.rateLimiter);

import("../../services/admin/createAdmin.js");

const adminRoutes = async (router) => {
  router.post("/admin/sign_in", limiter, controller.signIn);
  router.post(
    "/add/receptionists",
    limiter,
    adminAuth,
    celebrate(receptionist.addReceptionists),
    controller.signUp
  );

  router.post(
    "/add/sub_admins",
    limiter,
    adminAuth,
    celebrate(sub_admin.addSubAdmins),
    controller.signUp
  );
  router.post(
    "/add/receptionist",
    limiter,
    adminAuth,
    celebrate(receptionist.addReceptionist),
    controller.signUp
  );

  router.post(
    "/add/sub_admin",
    limiter,
    adminAuth,
    celebrate(sub_admin.addSubAdmin),
    controller.signUp
  );

  router.get(
    "/get/receptionist",
    limiter,
    adminAuth,
    controller.getReceptionist
  );

  router.get("/get/sub_admin", limiter, adminAuth, controller.getSubAdmin);

  router.delete("/delete/admin", limiter, adminAuth, controller.deleteAdmin);

  router.get(
    "/reimburseCount",
    limiter,
    subAdminAuth,
    controller.getReimburseCount
  );
  router.get(
    "/reimbursement/fullInfo",
    limiter,
    subAdminAuth,
    controller.getFullReimbursementInfo
  );
  router.get(
    "/reimbursement/allReimbursement",
    limiter,
    subAdminAuth,
    controller.getFullReimbursement
  );
  router.post(
    "/reimbursement/approve",
    limiter,
    subAdminAuth,
    controller.approveReimburse
  );
  router.get(
    "/getReimburse",
    limiter,
    subAdminAuth,
    controller.viewReimbursement
  );
  router.get("/getUser", limiter, subAdminAuth, controller.getUsers);
  router.post("/addUsers", limiter, subAdminAuth, controller.addUsers);
  router.delete("/user/remove", limiter, adminAuth, controller.removeUser);
  router.post(
    "/certificate/create",
    limiter,
    subAdminAuth,
    controller.createCertificate
  );
  router.get(
    "/certificate/get",
    limiter,
    subAdminAuth,
    controller.getCertificates
  );
  router.delete(
    "/certificate/delete",
    limiter,
    adminAuth,
    controller.deleteCertificate
  );

  router.get(
    "/receptionist/reimbursements",
    limiter,
    receptionistAuth,
    controller.getCertificatesReceptionist
  );

  router.post(
    "/receptionist/reimbursements",
    limiter,
    receptionistAuth,
    controller.approveReimburseReceptionist
  );
};
export default adminRoutes;
