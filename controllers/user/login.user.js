import { User } from "../../models/user.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, {
                message: "All fields are required",
                statusCode: 400,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return sendError(res, {
                message: "No account found with this email",
                statusCode: 404,
                field: "email",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendError(res, {
                message: "Incorrect password",
                statusCode: 401,
                field: "password",
            });
        }

        if (!user.status) {
            return sendError(res, {
                message: "Account is deactivated",
                statusCode: 403,
                field: "email",
            });
        }

        return sendSuccess(res, {
            data: user,
            message: "Login successful",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
