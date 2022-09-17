import { Router } from "express";
import glob from "glob";
// import config from "../config/userAuth.js";
const router = Router();
let controllers = glob.sync(`routes/**/index.js`);
controllers.forEach(async (controller) => {
  controller = controller.replace(/routes/, ".");
  const Router = await import(controller);
  await Router.default(router);
});

export default router;
