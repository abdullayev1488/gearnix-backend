import { Router } from "express";
import { getAllCategories } from "../controllers/category/getAll.category.js";
import { createCategory } from "../controllers/category/create.category.js";
import { deleteCategory } from "../controllers/category/delete.category.js";
import { editCategory } from "../controllers/category/update.category.js";
import { getCategoryById } from "../controllers/category/get.category.js";

export const CategoryRouter = new Router();

CategoryRouter.post("/create", createCategory);
CategoryRouter.get("/", getAllCategories);
CategoryRouter.get("/:id", getCategoryById);
CategoryRouter.put("/:id", editCategory);
CategoryRouter.delete("/:id", deleteCategory);