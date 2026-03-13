import { User } from "../../models/user.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return sendError(res, {
                message: "User not found",
                statusCode: 404,
            });
        }

        return sendSuccess(res, {
            data: user,
            message: "User fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
