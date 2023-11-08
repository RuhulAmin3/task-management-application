"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    env: process.env.NODE_DEV,
    dbUrl: process.env.DATABASE_URL,
    port: process.env.PORT,
    bcryptSoltRound: process.env.BCRYPT_SOLT_ROUND,
    jwt: {
        jwt_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwt_expireIn: process.env.JWT_EXPIRE_IN,
    },
};
