import { Brand } from "../../models/brand.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getAllBrands = async (req, res) => {
    try {
        const { status } = req.query;

        let filter = {};
        if (status === "active") filter.status = true;
        if (status === "inactive") filter.status = false;

        const brands = await Brand.find(filter).sort({ _id: -1 });

        return sendSuccess(res, {
            data: brands,
            message: "Brands fetched successfully"
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};