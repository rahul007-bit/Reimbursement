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
  db: process.env.db || "mongodb://127.0.0.1:27017/Reimbursement",
  rateLimiter: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2000, // limit each IP to 100 requests per windowMs
  },
  admin: {
    id: "12345",
    password: "12345",
  },
};

export default config;
