export const defaultPage  = 1;
export const defaultLimit = 10;

export const defaultSearch = "";
export const sortQueryMap = {
    "price-low"  : { price: 1 },
    "price-high" : { price: -1 },
    "rating"     : { rating: -1 },
    "latest"     : { createdAt: -1 },
    "popularity" : { reviews: -1 },
};

export const defaultSortQuery = { _id: -1 };

export const defaultMaxPrice = 1000;
export const objectIdRegex = /^[0-9a-fA-F]{24}$/;
