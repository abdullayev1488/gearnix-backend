import { Product } from "../../models/product.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return sendError(res, { message: "Product not found", statusCode: 404 });
        }

        return sendSuccess(res, {
            data: product,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return sendError(res, { message: "Invalid product ID", statusCode: 400 });
        }

        return sendError(res, { message: "Internal server error" });
    }
};
