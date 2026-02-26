import { Product } from "../../models/product.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getAllProducts = async (req, res) => {
    try {
        const { status, page = 1, limit = 10, search = "", category, brand, minPrice, maxPrice } = req.query;

        const p = parseInt(page);
        const l = parseInt(limit);
        const skip = (p - 1) * l;

        let filter = {};
        if (status === "active") filter.status = true;
        else if (status === "inactive") filter.status = false;

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (category) {
            filter.category = category;
        }

        if (brand) {
            filter.brand = brand;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(l)
            .populate("category")
            .populate("brand");

        return sendSuccess(res, {
            data: {
                products,
                pagination: {
                    total,
                    page: p,
                    limit: l,
                    pages: Math.ceil(total / l)
                }
            },
            message: "Products fetched successfully"
        });
    } catch (error) {
        console.error(error);
        return sendError(res, "Internal server error");
    }
};
