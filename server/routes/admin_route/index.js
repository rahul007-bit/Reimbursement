import rateLimit from "express-rate-limit";
import config from "../../config/index.js";
const limiter = rateLimit(config.rateLimiter);

export default async (router) => {
  router.get("/new", (req, res) => {
    res.send("hmm working");
  });
};
