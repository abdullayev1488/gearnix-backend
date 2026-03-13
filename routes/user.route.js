import { Router } from "express";
import { getAllUsers } from "../controllers/user/getAll.user.js";
import { registerUser } from "../controllers/user/register.user.js";
import { loginUser } from "../controllers/user/login.user.js";
import { updateUserStatus } from "../controllers/user/updateStatus.user.js";
import { getMe } from "../controllers/user/getMe.user.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const UserRouter = new Router();

UserRouter.get("/", getAllUsers);
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.patch("/:id/status", updateUserStatus);

// Protected route - requires JWT token
UserRouter.get("/me", authMiddleware, getMe);