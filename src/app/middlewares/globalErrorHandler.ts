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
  } else if (err instanceof Error) {
    message = err.name;
    statusCode = (err as any).status;
    errorMessages = [{ path: "", message: err.message }];
  }

  console.log(err);
  res.status(statusCode).json({
    success: false,
    name: message,
    errorMessages,
  });
};

export default globalErrorHandler;
