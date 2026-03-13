import { Contact } from "../../models/contact.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return sendError(res, {
                message: "Message not found",
                statusCode: 404,
            });
        }

        return sendSuccess(res, {
            data: contact,
            message: "Message deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
