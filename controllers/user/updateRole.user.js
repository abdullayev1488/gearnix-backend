import { User } from "../../models/user.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!role || !["customer", "admin"].includes(role)) {
            return sendError(res, {
                message: "Invalid role. Must be 'customer' or 'admin'",
                statusCode: 400,
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return sendError(res, {
                message: "User not found",
                statusCode: 404,
            });
        }

        user.role = role;
        await user.save();

        const userObj = user.toObject();
        delete userObj.password;

        return sendSuccess(res, {
            data: userObj,
            message: `User role updated to ${role} successfully`,
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
