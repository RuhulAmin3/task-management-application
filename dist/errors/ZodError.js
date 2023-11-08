"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleZodError = (error) => {
    const name = error.name;
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    const errorMessages = error.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode,
        name,
        errorMessages,
    };
};
exports.default = handleZodError;
