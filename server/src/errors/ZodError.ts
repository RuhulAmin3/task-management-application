import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const name = error.name;
  const statusCode = StatusCodes.BAD_REQUEST;
  const errorMessages: IGenericErrorMessage[] = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1] as string,
      message: issue.message,
    };
  });

  return {
    statusCode,
    name,
    errorMessages,
  };
};

export default handleZodError;
