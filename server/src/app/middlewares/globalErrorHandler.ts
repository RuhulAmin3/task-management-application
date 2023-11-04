import { ZodError } from "zod";
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import handleZodError from "../../errors/ZodError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = "something is wrong";
  let errorMessages: IGenericErrorMessage[] = [];
  if (err instanceof ZodError) {
    const zodError = handleZodError(err);
    statusCode = zodError.statusCode;
    message = zodError.name;
    errorMessages = zodError.errorMessages;
  }
  console.log(err);
  res.json({
    success: false,
    statusCode,
    name: message,
    errorMessages,
  });
};

export default globalErrorHandler;
