import express from "express";
import { taskController } from "./task.controller";
import { isLoggedIn } from "../../middlewares/isLoggedIn";
import zodValidationRequest from "../../middlewares/zodValidationRequest";
import { taskValidation } from "./task.validation";

const router = express.Router();

router.post(
  "/",
  isLoggedIn(),
  zodValidationRequest(taskValidation.createTask),
  taskController.createTask
);

export const taskRoutes = router;
