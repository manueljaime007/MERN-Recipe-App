import { Router } from "express";
import { recipes_router } from "./recipes.routes.js";
import { auth_routes } from "./auth.routes.js";

export const routes = Router();


routes.use("/recipes", recipes_router)
routes.use("/auth", auth_routes)
