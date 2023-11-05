import express from "express";
import { authValidation } from "./auth.validation";
import zodValidationRequest from "../../middlewares/zodValidationRequest";
import { authController } from "./auth.controller";

const router = express.Router();

router.post(
  "/signin",
  zodValidationRequest(authValidation.signinUser),
  authController.signinUser
);

router.post(
  "/signup",
  zodValidationRequest(authValidation.signupUser),
  authController.signupUser
);

export const authRoutes = router;
