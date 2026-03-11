import { Router } from "express";
import { createOrder } from "../controllers/order/create.order.js";
import { getAllOrders } from "../controllers/order/getAll.order.js";
import { updateOrderStatus } from "../controllers/order/updateStatus.order.js";
import { deleteOrder } from "../controllers/order/delete.order.js";

export const OrderRouter = new Router();

OrderRouter.post("/", createOrder);
OrderRouter.get("/", getAllOrders);
OrderRouter.patch("/:id/status", updateOrderStatus);
OrderRouter.delete("/:id", deleteOrder);
