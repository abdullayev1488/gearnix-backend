import { Product }  from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { Brand }    from "../models/brand.model.js";
import { sortQueryMap, defaultSortQuery, defaultMaxPrice } from "../const/index.const.js";
import { isValidObjectId, parseCommaSeparated }            from "../utils/index.utils.js";


const buildStatusFilter = (status) => {
    const statusMap = {
        active   : { status: true },
        inactive : { status: false },
    };

    return statusMap[status] ?? {};
};

const buildSearchFilter = (search) => {
    if (!search) return {};

    return { name: { $regex: search, $options: "i" } };
};

const buildCategoryFilter = async (category) => {
    if (!category) return {};

    if (isValidObjectId(category)) return { category };

    const matchedCategory = await Category.findOne({ name: category });
    return matchedCategory ? { category: matchedCategory._id } : {};
};

const buildBrandFilter = async (brandParam) => {
    const brandList = parseCommaSeparated(brandParam);
    if (brandList.length === 0) return {};

    const resolvedIds = await Promise.all(
        brandList.map(async (brand) => {
            if (isValidObjectId(brand)) return brand;

            const matchedBrand = await Brand.findOne({ name: brand });
            return matchedBrand?._id ?? null;
        })
    );

    const validBrandIds = resolvedIds.filter(Boolean);
    return validBrandIds.length > 0 ? { brand: { $in: validBrandIds } } : {};
};

const buildPriceFilter = (minPrice, maxPrice) => {
    if (!minPrice && !maxPrice) return {};

    return {
        price: {
            ...(minPrice && { $gte: Number(minPrice) }),
            ...(maxPrice && { $lte: Number(maxPrice) }),
        },
    };
};


export const buildProductFilter = async ({ status, search, category, brand, brands, minPrice, maxPrice }) => {
    const brandParam = brand || brands;

    const [categoryFilter, brandFilter] = await Promise.all([
        buildCategoryFilter(category),
        buildBrandFilter(brandParam),
    ]);

    return {
        ...buildStatusFilter(status),
        ...buildSearchFilter(search),
        ...categoryFilter,
        ...brandFilter,
        ...buildPriceFilter(minPrice, maxPrice),
    };
};

export const buildSortQuery = (sortBy) => {
    return sortQueryMap[sortBy] ?? defaultSortQuery;
};

export const fetchProducts = async ({ filter, sortQuery, skip, limit }) => {
    return Product.find(filter)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .populate("category")
        .populate("brand");
};

export const fetchMetaData = async (filter) => {
    const [highestPricedProduct, total] = await Promise.all([
        Product.findOne({ status: true }).sort({ price: -1 }).select("price"),
        Product.countDocuments(filter),
    ]);

    const maxPriceInDb = highestPricedProduct?.price ?? defaultMaxPrice;

    return { maxPriceInDb, total };
};