import createError from "http-errors";
import { Task } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const createTask = async (payload: Task): Promise<Task> => {
  const result = await prisma.task.create({
    data: payload,
  });

  if (!result) {
    throw new createError.BadRequest("failed to create task");
  }
  return result;
};

export const taskService = {
  createTask,
};
