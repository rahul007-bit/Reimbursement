import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// set the base path

import { addPath } from "app-module-path";
addPath(__dirname);

// importing the require module for the app
import express from "express";
import config from "./config/index.js";
import cors from "cors";
import mongoose from "mongoose";
import logger from "./config/logger.js";

const app = express();
app.use(cors());
app.options("*", cors());
// connecting to the database
// console.log(config.db);
mongoose.connect(
  config.db,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      logger.info("❌ " + "Mongodb Connection Error");
      logger.error(err);
    } else {
      logger.info("✅ " + "Mongodb Connected");
    }
  }
);

const db = mongoose.connection;
db.on("error", () => {
  throw new Error(`${"❌ " + "Unable to connect to database at "}${config.db}`);
});
db.once("open", () => {
  logger.info(
    `${"✅ " + "Connected to Database : "}${config.db.substring(
      config.db.lastIndexOf("/") + 1,
      config.db.length
    )}`
  );
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(config.port, () => {
  logger.info(`Express server listening on port ${config.port}`);
});
import appConfig from "./config/express_config.js";
appConfig(app, config);
