import { Order } from "../../models/order.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "username email")
            .sort({ createdAt: -1 });

        return sendSuccess(res, {
            data: orders,
            message: "Orders fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Failed to fetch orders" });
    }
};
