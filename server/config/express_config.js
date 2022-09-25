import bodyParser from "body-parser";
import compress from "compression";
import helmet from "helmet"; // Secures the app by using http headers
import morgan from "morgan"; // Http middleware for requests logger
import cookieParser from "cookie-parser";
import router from "../routes/main_route.js";

import logger from "./logger.js";
// import env from "./env.js";
import { errors } from "celebrate";

export default async (app, config) => {
  // mask the application type
  app.use(helmet());

  // set up logger
  app.use(morgan("dev", { stream: logger.stream }));

  // setup body parser and cookie parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

  // makes responses faster by compressing them
  app.use(compress());

  // CORS configuration

  // load routers

  app.use(`/api`, router);

  //The 404 Route (ALWAYS Keep this as the last route)
  app.all("*", (req, res) => {
    res.status(404).json({
      success: false,
      error: "No such API exists",
    });
  });

  app.use(errors());
};
