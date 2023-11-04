import express from "express";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import zodValidationRequest from "../../middlewares/zodValidationRequest";

const router = express.Router();

router.post(
  "/",
  zodValidationRequest(userValidation.createUser),
  userController.createUser
);

export const userRoutes = router;
