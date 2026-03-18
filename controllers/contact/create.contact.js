import { Contact } from "../../models/contact.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return sendError(res, {
                message: "All fields are required",
                statusCode: 400,
            });
        }

        const contactData = { name, email, subject, message };

        if (req.user) {
            contactData.user = req.user.id;
        }

        const contact = await Contact.create(contactData);

        return sendSuccess(res, {
            data: contact,
            message: "Message sent successfully",
            statusCode: 201,
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
