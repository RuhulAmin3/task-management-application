import { Response } from "express";

type GenericResponseType<T> = {
  success: true;
  message: string;
  statusCode: number;
  data: T;
  meta?: {
    total: number;
    limit: number;
    page: number;
    nextPage: number;
    prevPage: number;
  };
};

const genericResponse = <T>(res: Response, data: GenericResponseType<T>) => {
  return res.status(data.statusCode).json({
    success: true,
    message: data.message,
    data: data.data,
    meta: data.meta || null,
  });
};

export default genericResponse;
