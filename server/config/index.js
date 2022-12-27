import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let rootPath = path.normalize(`${__dirname}/..`);
import dotenv from "dotenv";
dotenv.config();
const config = {
  root: rootPath,
  app: {
    name: "reimbursement",
    domain: "http://localhost:8000",
  },
  jwtSecret: process.env.jwt_secret || "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  port: process.env.PORT || 8000,
  db:
    (process.env.NODE_ENV === "production" && process.env.db) ||
    "mongodb://127.0.0.1:27017/Reimbursement",
  rateLimiter: {
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 50, // limit each IP to 50 requests per windowMs
  },
  admin: {
    id: process.env.admin_id || "12345",
    password: process.env.admin_password || "12345",
    email: process.env.admin_email || "20104093@apsit.edu.in",
    firstName: process.env.admin_first_name || "Apsit Admin",
  },
};

export default config;
