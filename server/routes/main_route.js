import { Router } from "express";
import glob from "glob";
// import config from "../config/userAuth.js";
const router = Router();
let controllers = glob.sync(`routes/**/index.js`);
console.log(controllers);
controllers.forEach(async (controller) => {
  controller = controller.replace(/routes/, ".");
  const Router = await import(controller);
  console.log(controller, "DONE");
  await Router.default(router);
});

export default router;
