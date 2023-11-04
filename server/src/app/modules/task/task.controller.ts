import { NextFunction, Request, Response } from "express";
import { taskService } from "./task.service";
import { Task } from "@prisma/client";
import genericResponse from "../../../shared/response";
import { StatusCodes } from "http-status-codes";

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

export const taskController = {
  createTask,
};
