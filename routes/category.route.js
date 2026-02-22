import { Router } from "express";
import { getAllCategories } from "../controllers/category/get.category.js";
import { createCategory } from "../controllers/category/create.category.js";
import { deleteCategory } from "../controllers/category/delete.category.js";
import { editCategory } from "../controllers/category/put.category.js";
import { getCategoryById } from "../controllers/category/get-by-id.category.js";

export const CategoryRouter = new Router()



CategoryRouter.get('/all', getAllCategories)
CategoryRouter.post('/create', createCategory)
CategoryRouter.delete("/delete/:id", deleteCategory)
CategoryRouter.put("/edit/:id", editCategory)
CategoryRouter.get("/:id", getCategoryById)