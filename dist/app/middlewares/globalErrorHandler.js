"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
const ZodError_1 = __importDefault(require("../../errors/ZodError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let message = "something is wrong";
    let errorMessages = [];
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, ZodError_1.default)(err);
        statusCode = zodError.statusCode;
        message = zodError.name;
        errorMessages = zodError.errorMessages;
    }
    else if (err instanceof Error) {
        message = err.name;
        statusCode = err.status;
        errorMessages = [{ path: "", message: err.message }];
    }
    console.log(err);
    res.status(statusCode).json({
        success: false,
        name: message,
        errorMessages,
    });
};
exports.default = globalErrorHandler;
