import { Contact } from "../../models/contact.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .populate("user", "username email");

        return sendSuccess(res, {
            data: contacts,
            message: "Contacts fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
