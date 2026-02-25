import { Brand } from "../../models/brand.model.js";
import { sendError, sendSuccess } from "../../utils/responseHelper.js";


export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findByIdAndDelete(id);

        if (!brand) {
            return sendError(res, { message: "Brand not found", statusCode: 404 });
        }

        return sendSuccess(res, {
            data: brand,
            message: "Brand deleted successfully"
        });
    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return sendError(res, { message: "Invalid brand ID", statusCode: 400 });
        }

        return sendError(res, { message: "Internal server error" });
    }
};