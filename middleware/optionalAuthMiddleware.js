import jwt from "jsonwebtoken";

export const optionalAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        }
    } catch (error) {
        // Token invalid or expired - continue without user
        req.user = null;
    }

    next();
};
