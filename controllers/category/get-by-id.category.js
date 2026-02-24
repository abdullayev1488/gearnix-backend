import { Category } from "../../models/category.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return sendError(res, { message: "Category not found", statusCode: 404 });
        }

        return sendSuccess(res, {
            data: category,
            message: "Category fetched successfully"
        });
    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return sendError(res, { message: "Invalid category ID", statusCode: 400 });
        }

        return sendError(res, { message: "Internal server error" });
    }
};
