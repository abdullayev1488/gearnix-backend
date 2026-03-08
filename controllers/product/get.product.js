import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import { Brand } from "../../models/brand.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate("category")
            .populate("brand");

        if (!product) {
            return sendError(res, { message: "Product not found", statusCode: 404 });
        }

        const [allCategories, allBrands] = await Promise.all([
            Category.find({ status: true }),
            Brand.find({ status: true })
        ]);

        return sendSuccess(res, {
            data: {
                product,
                categories: allCategories,
                brands: allBrands
            },
            message: "Product fetched successfully"
        });
    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return sendError(res, { message: "Invalid product ID", statusCode: 400 });
        }

        return sendError(res, { message: "Internal server error" });
    }
};
