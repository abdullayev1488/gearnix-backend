import jwt from "jsonwebtoken";
import { sendError } from "../utils/responseHelper.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return sendError(res, {
                message: "Access denied. No token provided",
                statusCode: 401,
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return sendError(res, {
            message: "Invalid or expired token",
            statusCode: 401,
        });
    }
};
