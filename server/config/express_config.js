import bodyParser from "body-parser";
import compress from "compression";
import helmet from "helmet"; // Secures the app by using http headers
import morgan from "morgan"; // Http _middleware for requests logger
import cookieParser from "cookie-parser";
import router from "../routes/main_route.js";
import express from "express";
import logger from "./logger.js";
// import env from "./env.js";
import { errors } from "celebrate";

const appConfig = async (app) => {
  // mask the application type
  app.use(helmet());

  // set up logger
  app.use(morgan("dev", { stream: logger.stream }));

  // setup body parser and cookie parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  app.use(cookieParser());
  // makes responses faster by compressing them
  app.use(compress());

  // serve static files from uploads folder with some middleware authentication
  app.use("/uploads", express.static("uploads"));

  // load routers
  app.use(`/api`, router);

  app.get("/", (_, res) => {
    res.send("Welcome to the Reimbursement API!");
  });

  //The 404 Route (ALWAYS Keep this as the last route)
  app.all("*", (req, res) => {
    res.status(404).json({
      success: false,
      error: "404 Not Found",
    });
  });

  app.use(errors());
};
export default appConfig;
