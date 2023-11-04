import { Priority, TaskStatus } from "@prisma/client";
import { z } from "zod";

const createTask = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required",
    }),
    userId: z.string({
      required_error: "user id is required",
    }),
    status: z.enum([...Object.values(TaskStatus)] as [string, ...string[]], {
      required_error: "task status is required",
    }),
    priority: z.enum([...Object.values(Priority)] as [string, ...string[]], {
      required_error: "priority is required",
    }),
  }),
});

const updateTask = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([...Object.values(TaskStatus)] as [string, ...string[]])
      .optional(),
    priority: z
      .enum([...Object.values(Priority)] as [string, ...string[]])
      .optional(),
  }),
});

export const taskValidation = {
  createTask,
  updateTask,
};
