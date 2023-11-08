"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createTask = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "title is required",
        }),
        userId: zod_1.z.string({
            required_error: "user id is required",
        }),
        status: zod_1.z.enum([...Object.values(client_1.TaskStatus)], {
            required_error: "task status is required",
        }),
        priority: zod_1.z.enum([...Object.values(client_1.Priority)], {
            required_error: "priority is required",
        }),
    }),
});
const updateTask = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        status: zod_1.z
            .enum([...Object.values(client_1.TaskStatus)])
            .optional(),
        priority: zod_1.z
            .enum([...Object.values(client_1.Priority)])
            .optional(),
    }),
});
exports.taskValidation = {
    createTask,
    updateTask,
};
