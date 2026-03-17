import { User } from "../../models/user.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

        if (user.role !== "customer") {
            return sendError(res, {
                message: "No account found with this email",
                statusCode: 403,
                field: "email",
            });
        }

        if (!user.status) {
            return sendError(res, {
                message: "Account is deactivated",
                statusCode: 403,
                field: "email",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Return user without password
        const userObj = user.toObject();
        delete userObj.password;

        return sendSuccess(res, {
            data: { user: userObj, token },
            message: "Login successful",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
