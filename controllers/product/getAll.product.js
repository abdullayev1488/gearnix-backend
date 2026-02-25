import { Product } from "../../models/product.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getAllProducts = async (req, res) => {
    try {
        const { status } = req.query;

        let filter = {};
        if (status === "active") filter.status = true;
        if (status === "inactive") filter.status = false;

        const products = await Product.find(filter).sort({ _id: -1 });

        return sendSuccess(res, {
            data: products,
            message: "Products fetched successfully"
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
