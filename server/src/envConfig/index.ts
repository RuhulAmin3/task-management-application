import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_DEV,
  dbUrl: process.env.DATABASE_URL,
  port: process.env.PORT,
};
