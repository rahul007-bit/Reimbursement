import { fileURLToPath } from "url";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./model/graphSql/typedefs.js";
import resolvers from "./model/graphSql/graphSql.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// set the base path

import { addPath } from "app-module-path";
addPath(__dirname);

// importing the require module for the app
import express, { json } from "express";
import config from "./config/index.js";
import cors from "cors";
import mongoose from "mongoose";
import logger from "./config/logger.js";

const app = express();
app.use(cors());
app.options("*", cors());

mongoose.set("strictQuery", true);

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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  // res.header(
  //   "Access-Control-Allow-Origin",
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  next();
});

// apollo server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: "bounded",
});

await server.start();

server.applyMiddleware({ app, path: "/reimbursement_graph_ql" });

app.listen(config.port, () => {
  logger.info(`🚀 Express server listening on port ${config.port}`);
  logger.info(
    `🚀  Apollo Server ready at http://localhost:${config.port}${server.graphqlPath}`
  );
});
import appConfig from "./config/express_config.js";
appConfig(app);
