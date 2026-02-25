import { Router } from "express";
import { getAllProducts } from "../controllers/product/getAll.product.js";
import { getProductById } from "../controllers/product/get.product.js";
import { createProduct } from "../controllers/product/create.product.js";
import { updateProduct } from "../controllers/product/update.product.js";
import { deleteProduct } from "../controllers/product/delete.product.js";

export const ProductRouter = new Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:id", getProductById);
ProductRouter.post("/create", createProduct);
ProductRouter.put("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);
