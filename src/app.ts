import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import allRoutes from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { StatusCodes } from "http-status-codes";
export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", allRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json("in the name of Allah");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Not-found",
    errorMessage: [{ path: req.originalUrl, message: "route not found" }],
  });
});

app.use(globalErrorHandler);
