"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("./task.controller");
const isLoggedIn_1 = require("../../middlewares/isLoggedIn");
const zodValidationRequest_1 = __importDefault(require("../../middlewares/zodValidationRequest"));
const task_validation_1 = require("./task.validation");
const router = express_1.default.Router();
router.post("/", (0, isLoggedIn_1.isLoggedIn)(), (0, zodValidationRequest_1.default)(task_validation_1.taskValidation.createTask), task_controller_1.taskController.createTask);
router.get("/", (0, isLoggedIn_1.isLoggedIn)(), task_controller_1.taskController.getTasks);
router.get("/:id", (0, isLoggedIn_1.isLoggedIn)(), task_controller_1.taskController.getSignleTasks);
router.patch("/:id", (0, isLoggedIn_1.isLoggedIn)(), (0, zodValidationRequest_1.default)(task_validation_1.taskValidation.updateTask), task_controller_1.taskController.updateTask);
router.delete("/:id", (0, isLoggedIn_1.isLoggedIn)(), task_controller_1.taskController.deleteTask);
exports.taskRoutes = router;
