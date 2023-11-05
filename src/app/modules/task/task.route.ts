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

router.get("/", isLoggedIn(), taskController.getTasks);
router.get("/:id", isLoggedIn(), taskController.getSignleTasks);

router.patch(
  "/:id",
  isLoggedIn(),
  zodValidationRequest(taskValidation.updateTask),
  taskController.updateTask
);

router.delete("/:id", isLoggedIn(), taskController.deleteTask);

export const taskRoutes = router;
