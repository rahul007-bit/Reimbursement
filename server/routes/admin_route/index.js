import rateLimit from "express-rate-limit";
import config from "../../config/index.js";
import controller from "../../controllers/admin/index.js";
const limiter = rateLimit(config.rateLimiter);

export default async (router) => {
  router.post("/admin/sign_up", limiter, controller.signUp);
  router.post("/admin/sign_in", limiter, controller.signIn);
  router.get("/new", (req, res) => {
    res.send("hmm working");
  });
};
