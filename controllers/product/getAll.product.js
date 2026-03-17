import { parsePagination } from "../../utils/index.utils.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";
import { defaultSearch } from "../../const/index.const.js";
import  { buildProductFilter, buildSortQuery, fetchProducts, fetchMetaData, } from "../../service/productService.js";
import { Category } from "../../models/category.model.js";
import { Brand } from "../../models/brand.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const { status, page, limit, search = defaultSearch, category, brand, brands, minPrice, maxPrice, sortBy, } = req.query;
        const { currentPage, pageLimit, skip } = parsePagination({ page, limit });
        
        const filter = await buildProductFilter({ status, search, category, brand, brands, minPrice, maxPrice });

        const sortQuery = buildSortQuery(sortBy);

        const [products, { maxPriceInDb, total }, allCategories, allBrands] = await Promise.all([
            fetchProducts({ filter, sortQuery, skip, limit: pageLimit }),
            fetchMetaData(filter),
            Category.find().select("_id name"),
            Brand.find().select("_id name"),
        ]);

        return sendSuccess(res, {
            data: {
                products,
                categories: allCategories,
                brands: allBrands,
                pagination: {
                    total,
                    page: currentPage,
                    limit: pageLimit,
                    pages: Math.ceil(total / pageLimit),
                    maxPrice: maxPriceInDb,
                },
            },
            message: "Products fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, "Internal server error");
    }
};