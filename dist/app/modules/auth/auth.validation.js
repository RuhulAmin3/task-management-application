"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const signupUser = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({
            required_error: "first name is required",
        }),
        lastName: zod_1.z.string({
            required_error: "last name is required",
        }),
        email: zod_1.z
            .string({
            required_error: "email is required",
        })
            .email({ message: "provide a valid email" }),
        password: zod_1.z.string({
            required_error: "password is required",
        }),
    }),
});
const signinUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "email is required",
        })
            .email({ message: "provide valid email" }),
        password: zod_1.z.string({
            required_error: "password is required",
        }),
    }),
});
exports.authValidation = {
    signupUser,
    signinUser,
};
