import { Router } from "express";
import { login, register, profile } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.js";

export const auth_routes = Router()

auth_routes.get('/profile', protect, profile)
auth_routes.post("/login", login)
auth_routes.post("/register", register)