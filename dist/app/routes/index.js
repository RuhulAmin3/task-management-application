"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const task_route_1 = require("../modules/task/task.route");
const router = express_1.default.Router();
const allRoutes = [
    { path: "/auth", route: auth_route_1.authRoutes },
    { path: "/task", route: task_route_1.taskRoutes },
];
allRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
