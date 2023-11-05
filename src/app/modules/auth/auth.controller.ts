import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { StatusCodes } from "http-status-codes";
import genericResponse from "../../../shared/response";
import { ISigninResponse, ISignupResponseType } from "./auth.interface";

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const result = await authService.signupUser(userData);

    res.cookie("accessToken", result.accessToken);

    genericResponse<ISignupResponseType>(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "user created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const signinUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const result = await authService.signinUser(userData);

    res.cookie("accessToken", result.accessToken);

    genericResponse<ISigninResponse>(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "user login successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const authController = {
  signupUser,
  signinUser,
};
