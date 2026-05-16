import { User } from "../../models/user.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;

        const filter = {};

        if (role) {
            filter.role = role;
        }

        const users = await User.find(filter).sort({ _id: -1 });

        return sendSuccess(res, {
            data: users,
            message: "Users fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};