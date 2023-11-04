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

const getTasks = async (userId: string): Promise<Task[]> => {
  const result = await prisma.task.findMany({
    where: {
      userId,
    },
  });

  if (result.length === 0) {
    throw new createError.NotFound("there is no task");
  }
  return result;
};

const getSingleTask = async (id: string): Promise<Task> => {
  const result = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new createError.NotFound("task not found");
  }
  return result;
};

const updateTask = async (
  id: string,
  payload: Partial<Task>
): Promise<Task> => {
  const isExistTask = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  if (!isExistTask) {
    throw new createError.NotFound("task not found");
  }

  const result = await prisma.task.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

const deleteTask = async (id: string) => {
  const isExistTask = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });
  if (!isExistTask) {
    throw new createError.NotFound("task not found");
  }

  const result = await prisma.task.delete({
    where: {
      id: id,
    },
  });

  return result;
};

export const taskService = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getSingleTask,
};
