"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("./auth.validation");
const zodValidationRequest_1 = __importDefault(require("../../middlewares/zodValidationRequest"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/signin", (0, zodValidationRequest_1.default)(auth_validation_1.authValidation.signinUser), auth_controller_1.authController.signinUser);
router.post("/signup", (0, zodValidationRequest_1.default)(auth_validation_1.authValidation.signupUser), auth_controller_1.authController.signupUser);
exports.authRoutes = router;
