import { Product } from "../../models/product.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const createProduct = async (req, res) => {
    try {
        const { name, image, price, oldPrice, rating, reviews, status, category } = req.body;

        if (!name || !name.trim()) {
            return sendError(res, { message: "Product name is required", statusCode: 400 });
        }

        if (!image) {
            return sendError(res, { message: "Product image is required", statusCode: 400 });
        }

        if (price === undefined || price === null || price < 0) {
            return sendError(res, { message: "Valid product price is required", statusCode: 400 });
        }

        if (!category) {
            return sendError(res, { message: "Product category is required", statusCode: 400 });
        }

        const product = await Product.create({
            name: name.trim(),
            image,
            price,
            oldPrice: oldPrice !== undefined ? oldPrice : null,
            rating: rating !== undefined ? rating : 0,
            reviews: reviews !== undefined ? reviews : 0,
            status: status !== undefined ? status : true,
            category
        });

        return sendSuccess(res, {
            data: product,
            message: "Product created successfully",
            statusCode: 201
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
