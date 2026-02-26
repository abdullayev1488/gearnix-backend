import { Product } from "../../models/product.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, price, oldPrice, rating, reviews, status, category } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return sendError(res, { message: "Product not found", statusCode: 404 });
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (image !== undefined) updateData.image = image;
        if (price !== undefined) updateData.price = price;
        if (oldPrice !== undefined) updateData.oldPrice = oldPrice;
        if (rating !== undefined) updateData.rating = rating;
        if (reviews !== undefined) updateData.reviews = reviews;
        if (status !== undefined) updateData.status = status;
        if (category !== undefined) updateData.category = category;

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        return sendSuccess(res, {
            data: updatedProduct,
            message: "Product updated successfully"
        });
    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return sendError(res, { message: "Invalid product ID", statusCode: 400 });
        }

        return sendError(res, { message: "Internal server error" });
    }
};
