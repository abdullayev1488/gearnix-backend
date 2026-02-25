import { Category } from "../../models/category.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, status } = req.body;

        const category = await Category.findById(id);
        if (!category) {
            return sendError(res, { message: "Category not found", statusCode: 404 });
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (image !== undefined) updateData.images = { shop: image };
        if (status !== undefined) updateData.status = status;

        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

        return sendSuccess(res, {
            data: updatedCategory,
            message: "Category updated successfully"
        });
    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return sendError(res, { message: "Invalid category ID", statusCode: 400 });
        }

        return sendError(res, { message: "Internal server error" });
    }
};
