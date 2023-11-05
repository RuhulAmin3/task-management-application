import { NextFunction, Request, Response } from "express";
import { taskService } from "./task.service";
import { Task } from "@prisma/client";
import genericResponse from "../../../shared/response";
import { StatusCodes } from "http-status-codes";
import pickQuery from "../../../shared/pickQuery";
import { paginationFields, taskQueryFields } from "./task.constant";
import { IPaginationOptions, ITaskSearchField } from "./task.interface";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskData = req.body;
    const result = await taskService.createTask(taskData);

    genericResponse<Task>(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "task created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const paginationOptions = pickQuery(req.query, paginationFields);
    const searchOptions = pickQuery(req.query, taskQueryFields);
    const result = await taskService.getTasks(
      id,
      paginationOptions as IPaginationOptions,
      searchOptions as ITaskSearchField
    );

    genericResponse<Task[]>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "all task retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  } catch (err) {
    next(err);
  }
};

const getSignleTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await taskService.getSingleTask(id, userId);

    genericResponse<Task>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "all task retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const userId = req.user.id;
    const result = await taskService.updateTask(id, userId, data);

    genericResponse<Task>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "task updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await taskService.deleteTask(id, userId);

    genericResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "task deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const taskController = {
  createTask,
  getTasks,
  updateTask,
  getSignleTasks,
  deleteTask,
};
