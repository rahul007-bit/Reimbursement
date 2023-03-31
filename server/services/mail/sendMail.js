import { customAlphabet } from "nanoid";
import nodemailer from "nodemailer";

const sendMail = async (mailDetailsUser) => {
  try {
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });
    await mailTransporter.sendMail(mailDetailsUser, function (err, data) {
      if (err) {
        console.log("Error Occurs");
        throw err;
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const generateLoginCode = () => {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 4);
  return nanoid() + "-" + nanoid() + "-" + nanoid() + "-" + nanoid();
};

export default sendMail;
