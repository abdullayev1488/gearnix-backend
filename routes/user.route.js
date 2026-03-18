import { Router } from "express";
import { getAllUsers } from "../controllers/user/getAll.user.js";
import { registerUser } from "../controllers/user/register.user.js";
import { loginUser } from "../controllers/user/login.user.js";
import { adminLogin } from "../controllers/user/adminLogin.user.js";
import { updateUserStatus } from "../controllers/user/updateStatus.user.js";
import { updateUserRole } from "../controllers/user/updateRole.user.js";
import { getMe } from "../controllers/user/getMe.user.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const UserRouter = new Router();

UserRouter.get("/", getAllUsers);
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/admin/login", adminLogin);
UserRouter.patch("/:id/status", updateUserStatus);
UserRouter.patch("/:id/role", updateUserRole);

UserRouter.get("/me", authMiddleware, getMe);