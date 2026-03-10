import { User } from "../../models/user.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return sendError(res, {
                message: "User not found",
                statusCode: 404,
            });
        }

        user.status = !user.status;
        await user.save();

        return sendSuccess(res, {
            data: user,
            message: `User ${user.status ? "activated" : "deactivated"} successfully`,
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
