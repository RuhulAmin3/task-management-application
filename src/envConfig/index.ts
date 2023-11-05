import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_DEV,
  dbUrl: process.env.DATABASE_URL,
  port: process.env.PORT,
  bcryptSoltRound: process.env.BCRYPT_SOLT_ROUND,
  jwt: {
    jwt_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwt_expireIn: process.env.JWT_EXPIRE_IN,
  },
};
