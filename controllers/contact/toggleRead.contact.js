import { Contact } from "../../models/contact.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const toggleReadContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return sendError(res, {
                message: "Message not found",
                statusCode: 404,
            });
        }

        contact.isRead = !contact.isRead;
        await contact.save();

        return sendSuccess(res, {
            data: contact,
            message: contact.isRead ? "Marked as read" : "Marked as unread",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
