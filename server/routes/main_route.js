import { Router } from "express";
import glob from "glob";
// import config from "../config/index.js";
const router = Router();

let controllers = glob.sync(`routes/**/index.js`);
controllers.forEach(async (controller) => {
  controller = controller.replace(/routes/, ".");
  const Router = await import(controller);
  Router.default(router);
});

export default router;
