import { userAuth } from "./auth/userAuth.js";
import rateLimit from "express-rate-limit";
import { celebrate } from "celebrate";
import config from "../../config/index.js";
import controller from "../../controllers/user/index.js";

const limit = rateLimit(config.rateLimiter);

export default async (router) => {
  router.post("/user/sign_up", limit, controller.signUp);
  router.post("/user/sign_in", limit, controller.signIn);
};
