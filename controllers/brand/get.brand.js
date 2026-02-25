import { Brand } from "../../models/brand.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findById(id);

        if (!brand) {
            return sendError(res, { message: "Brand not found", statusCode: 404 });
        }

        return sendSuccess(res, {
            data: brand,
            message: "Brand fetched successfully"
        });
    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return sendError(res, { message: "Invalid brand ID", statusCode: 400 });
        }

        return sendError(res, { message: "Internal server error" });
    }
};