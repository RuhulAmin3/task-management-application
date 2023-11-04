import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { StatusCodes } from "http-status-codes";
import genericResponse from "../../../shared/response";
import { User } from "@prisma/client";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const result = await authService.signupUser(userData);

    genericResponse<Omit<User, "password">>(res, {
      statusCode: StatusCodes.CREATED,
      message: "user created successfully",
      data: result,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createUser,
};
