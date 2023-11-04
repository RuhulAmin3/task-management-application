import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { taskRoutes } from "../modules/task/task.route";
const router = express.Router();

const allRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/task", route: taskRoutes },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
