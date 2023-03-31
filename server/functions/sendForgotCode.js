import { generateLoginCode } from "../services/mail/sendMail.js";
import sendEmail from "../services/mail/sendMail.js";
import ResetPassword from "../model/resetPassword/index.js";
import config from "../config/index.js";
import fs from "fs";
import path from "path";

export const sendForgotCode = async (user) => {
  try {
    const code = generateLoginCode();
    const __dirname = path.resolve();
    const htmlPath = path.join(__dirname, "Templates", "tmp-code.html");
    let html = fs.readFileSync(htmlPath, "utf8");
    html = html.replace("{{code}}", code);
    console.log(code);
    const options = {
      from: config.admin.email,
      to: user.email,
      subject: "Password Reset Code",
      html,
    };

    await sendEmail(options);
    // delete old code
    await ResetPassword.deleteMany({ user: user._id });
    // save new code
    await ResetPassword.create({
      user: user._id,
      resetCode: code,
      moodleId: user.moodleId,
      onModel: user.type ? "User" : "Admin",
    });

    return {
      status: 200,
      success: true,
      message: "Code sent successfully",
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: error.message,
    };
  }
};
