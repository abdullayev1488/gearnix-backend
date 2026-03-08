import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import { Brand } from "../../models/brand.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getAllProducts = async (req, res) => {
    try {
        const { status, page = 1, limit = 10, search = "", category, brand, brands, minPrice, maxPrice, sortBy } = req.query;

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
            // Check if it's a valid ObjectId, if not, find by name
            if (category.match(/^[0-9a-fA-F]{24}$/)) {
                filter.category = category;
            } else {
                const foundCategory = await Category.findOne({ name: category });
                if (foundCategory) filter.category = foundCategory._id;
            }
        }

        // Support both single 'brand' and multiple 'brands'
        const brandFilter = brand || brands;
        if (brandFilter) {
            const brandList = Array.isArray(brandFilter) ? brandFilter : brandFilter.split(",");
            const brandIds = [];

            for (const b of brandList) {
                if (b.match(/^[0-9a-fA-F]{24}$/)) {
                    brandIds.push(b);
                } else {
                    const foundBrand = await Brand.findOne({ name: b });
                    if (foundBrand) brandIds.push(foundBrand._id);
                }
            }

            if (brandIds.length > 0) {
                filter.brand = { $in: brandIds };
            }
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Sorting logic
        let sortQuery = { _id: -1 }; // default
        if (sortBy === "price-low") sortQuery = { price: 1 };
        else if (sortBy === "price-high") sortQuery = { price: -1 };
        else if (sortBy === "rating") sortQuery = { rating: -1 };
        else if (sortBy === "latest") sortQuery = { createdAt: -1 };
        else if (sortBy === "popularity") sortQuery = { reviews: -1 };

        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .sort(sortQuery)
            .skip(skip)
            .limit(l)
            .populate("category")
            .populate("brand");

        const [allCategories, allBrands, highestPriceProduct] = await Promise.all([
            Category.find({ status: true }),
            Brand.find({ status: true }),
            Product.findOne({ status: true }).sort({ price: -1 }).select("price")
        ]);

        const maxPriceInDb = highestPriceProduct ? highestPriceProduct.price : 1000;

        return sendSuccess(res, {
            data: {
                products,
                categories: allCategories,
                brands: allBrands,
                pagination: {
                    total,
                    page: p,
                    limit: l,
                    pages: Math.ceil(total / l),
                    maxPrice: maxPriceInDb
                }
            },
            message: "Products fetched successfully"
        });
    } catch (error) {
        console.error(error);
        return sendError(res, "Internal server error");
    }
};
