import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../../shared/jwt";
import envConfig from "../../envConfig";
import { Secret } from "jsonwebtoken";

export const isLoggedIn =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new createError.Unauthorized("you are unauthorized user");
      }
      const isVarifiedToken = jwtHelper.verifyToken(
        token,
        envConfig.jwt.jwt_secret as Secret
      );
      console.log("isVarifiedToken", isVarifiedToken);
      if (!isVarifiedToken) {
        throw new createError.Unauthorized("you are unauthorized user");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
