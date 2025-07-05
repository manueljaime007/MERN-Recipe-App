import { Router } from "express";
import { indexByCategory, showById, store, update, destroy } from "../controllers/recipes.controller.js";
import { protect } from "../middlewares/auth.js";

export const recipes_router = Router();

recipes_router.route('/')
    .get(indexByCategory)
    .post(protect, store)

recipes_router.route('/:id')
    .get(showById)
    .put(protect, update)
    .delete(protect, destroy);