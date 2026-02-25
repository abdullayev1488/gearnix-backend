import { Router } from "express";
import { getAllBrands } from "../controllers/brand/getAll.brand.js";
import { getBrandById } from "../controllers/brand/get.brand.js";
import { createBrand } from "../controllers/brand/create.brand.js";
import { updateBrand } from "../controllers/brand/update.brand.js";
import { deleteBrand } from "../controllers/brand/delete.brand.js";

export const BrandRouter = new Router();

BrandRouter.get("/", getAllBrands);
BrandRouter.get("/:id", getBrandById);
BrandRouter.post("/create", createBrand);
BrandRouter.put("/:id", updateBrand);
BrandRouter.delete("/:id", deleteBrand);
