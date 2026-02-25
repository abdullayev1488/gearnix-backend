import { Brand } from "../../models/brand.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const createBrand = async (req, res) => {
    try {
        const { name, image, status } = req.body;

        if (!name || !name.trim()) {
            return sendError(res, { message: "Brand name is required", statusCode: 400 });
        }

        if (!image) {
            return sendError(res, { message: "Brand image is required", statusCode: 400 });
        }

        const existingBrand = await Brand.findOne({ name: name.trim() });
        if (existingBrand) {
            return sendError(res, { message: "Brand with this name already exists", statusCode: 409 });
        }

        const brand = await Brand.create({
            name: name.trim(),
            image,
            status: status !== undefined ? status : true
        });

        return sendSuccess(res, {
            data: brand,
            message: "Brand created successfully",
            statusCode: 201
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
