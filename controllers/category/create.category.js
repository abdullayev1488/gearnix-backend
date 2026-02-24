import { Category } from "../../models/category.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const createCategory = async (req, res) => {
    try {
        const { name, image, status } = req.body;

        if (!name || !name.trim()) {
            return sendError(res, { message: "Category name is required", statusCode: 400 });
        }

        if (!image) {
            return sendError(res, { message: "Category image is required", statusCode: 400 });
        }

        const existingCategory = await Category.findOne({ name: name.trim() });
        if (existingCategory) {
            return sendError(res, { message: "Category with this name already exists", statusCode: 409 });
        }

        const category = await Category.create({
            name: name.trim(),
            images: { shop: image },
            status: status !== undefined ? status : true
        });

        return sendSuccess(res, {
            data: category,
            message: "Category created successfully",
            statusCode: 201
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
