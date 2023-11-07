import createError from "http-errors";
import { Prisma, Task } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { userSelectFields, taskSearchableFields } from "./task.constant";
import {
  IGenericResponse,
  IPaginationOptions,
  ITaskSearchField,
} from "./task.interface";
import { calculatePagination } from "../../../shared/pagination";

const createTask = async (payload: Task): Promise<Task> => {
  const result = await prisma.task.create({
    data: payload,
    include: {
      user: {
        select: userSelectFields,
      },
    },
  });

  if (!result) {
    throw new createError.BadRequest("failed to create task");
  }
  return result;
};

const getTasks = async (
  userId: string,
  paginationOption: IPaginationOptions,
  searchOption: ITaskSearchField
): Promise<IGenericResponse<Task[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(
    Number(paginationOption.page),
    Number(paginationOption.limit),
    paginationOption.sortBy,
    paginationOption.sortOrder
  );
  const { searchTerm, ...filterData } = searchOption;
  const conditions = [];

  // search task title, status, priority
  if (searchTerm) {
    conditions.push({
      OR: taskSearchableFields.map((field) => {
        return {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  // filtering task
  if (Object.keys(filterData).length > 0) {
    conditions.push({
      AND: Object.entries(filterData).map(([field, value]) => {
        return {
          [field]: {
            equals: value,
          },
        };
      }),
    });
  }

  const finalCondition: Prisma.TaskWhereInput =
    conditions.length > 0
      ? {
          AND: conditions,
          userId,
        }
      : { userId };
  const result = await prisma.task.findMany({
    where: finalCondition,
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      user: {
        select: userSelectFields,
      },
    },
  });

  const totalTask = await prisma.task.count({
    where: finalCondition,
  });
  const totalPages = Math.ceil(totalTask / limit);
  const prevPage = page - 1 > 0 ? page - 1 : null;
  const nextpage = page + 1 <= totalPages ? page + 1 : null;

  return {
    meta: {
      page,
      limit,
      total: totalTask,
      totalPages,
      prevPage,
      nextpage,
    },
    data: result,
  };
};

const getSingleTask = async (id: string, userId: string): Promise<Task> => {
  const result = await prisma.task.findUnique({
    where: {
      id,
      userId,
    },
    include: {
      user: {
        select: userSelectFields,
      },
    },
  });

  if (!result) {
    throw new createError.NotFound("task not found");
  }
  return result;
};

const updateTask = async (
  id: string,
  userId: string,
  payload: Partial<Task>
): Promise<Task> => {
  const isExistTask = await prisma.task.findUnique({
    where: {
      id,
      userId: userId,
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
    include: {
      user: {
        select: userSelectFields,
      },
    },
  });
  if (!result) {
    throw new createError.BadRequest("fail  to update task");
  }

  return result;
};

const deleteTask = async (id: string, userId: string) => {
  const isExistTask = await prisma.task.findUnique({
    where: {
      id: id,
      userId,
    },
  });

  if (!isExistTask) {
    throw new createError.NotFound("task not found");
  }

  const result = await prisma.task.delete({
    where: {
      id: id,
      userId,
    },
  });

  if (!result) {
    throw new createError.BadRequest("failed to delete task");
  }

  return result;
};

export const taskService = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getSingleTask,
};
