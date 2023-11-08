"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_errors_1 = __importDefault(require("http-errors"));
const prisma_1 = require("../../../shared/prisma");
const jwt_1 = require("../../../shared/jwt");
const envConfig_1 = __importDefault(require("../../../envConfig"));
const utils_1 = require("../../../utils");
const signinUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!isUserExist) {
        throw new http_errors_1.default.NotFound("wrong credentials");
    }
    const isPasswordMatched = bcrypt_1.default.compareSync(payload.password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new http_errors_1.default.NotFound("wrong credentials");
    }
    const accessToken = jwt_1.jwtHelper.createToken({
        email: isUserExist.email,
        id: isUserExist.id,
    }, envConfig_1.default.jwt.jwt_secret, envConfig_1.default.jwt.jwt_expireIn);
    return {
        accessToken,
        message: "user login successful",
    };
});
const signupUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (isUserExist) {
        throw new http_errors_1.default.BadRequest("user already exist");
    }
    // password hashed
    const hashPassword = bcrypt_1.default.hashSync(payload.password, Number(envConfig_1.default.bcryptSoltRound));
    payload.password = hashPassword;
    const result = yield prisma_1.prisma.user.create({
        data: payload,
    });
    if (!result) {
        throw new http_errors_1.default.BadRequest("failed to create user");
    }
    const accessToken = jwt_1.jwtHelper.createToken({
        email: result.email,
        id: result.id,
    }, envConfig_1.default.jwt.jwt_secret, envConfig_1.default.jwt.jwt_expireIn);
    // remove password after user created successfully
    const userWithoutPassword = (0, utils_1.excludeField)(result, ["password"]);
    const response = {
        data: userWithoutPassword,
        accessToken: accessToken,
    };
    return response;
});
exports.authService = {
    signinUser,
    signupUser,
};
