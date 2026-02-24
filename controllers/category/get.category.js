import { Category } from "../../models/category.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getAllCategories = async (req, res) => {
    try {
        const { status } = req.query;

        let filter = {};
        if (status === "active") filter.status = true;
        if (status === "inactive") filter.status = false;

        const categories = await Category.find(filter).sort({ _id: -1 });

        return sendSuccess(res, {
            data: categories,
            message: "Categories fetched successfully"
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
