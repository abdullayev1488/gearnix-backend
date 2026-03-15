import { User } from "../../models/user.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return sendError(res, {
                message: "All fields are required",
                statusCode: 400,
            });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return sendError(res, {
                message: "This username is already taken",
                statusCode: 409,
                field: "username",
            });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return sendError(res, {
                message: "An account with this email already exists",
                statusCode: 409,
                field: "email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

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
            message: "Registration successful",
            statusCode: 201,
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Internal server error" });
    }
};
