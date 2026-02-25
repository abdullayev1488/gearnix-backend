import { Brand } from "../../models/brand.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, status } = req.body;

        const brand = await Brand.findById(id);
        if (!brand) {
            return sendError(res, { message: "Brand not found", statusCode: 404 });
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (image !== undefined) updateData.image = image;
        if (status !== undefined) updateData.status = status;

        const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, { new: true });

        return sendSuccess(res, {
            data: updatedBrand,
            message: "Brand updated successfully"
        });
    } catch (error) {
        console.error(error);

        if (error.name === "CastError") {
            return sendError(res, { message: "Invalid brand ID", statusCode: 400 });
        }

        return sendError(res, { message: "Internal server error" });
    }
};
