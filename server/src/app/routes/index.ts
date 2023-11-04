import express from "express";
import { userRoutes } from "../modules/user/user.route";
const router = express.Router();

const allRoutes = [
  { path: "/user", route: userRoutes },
  { path: "/task", route: userRoutes },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
