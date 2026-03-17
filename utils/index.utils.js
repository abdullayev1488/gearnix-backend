import { objectIdRegex, defaultPage, defaultLimit } from "../const/index.const.js";

export const parsePagination = ({ page = defaultPage, limit = defaultLimit }) => {
    const currentPage = parseInt(page);
    const pageLimit   = parseInt(limit);
    const skip        = (currentPage - 1) * pageLimit;

    return { currentPage, pageLimit, skip };
};


export const isValidObjectId = (id) => objectIdRegex.test(id);


export const parseCommaSeparated = (value) => {
    if (!value) return [];
    return Array.isArray(value) ? value : value.split(",");
};