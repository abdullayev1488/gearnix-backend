import { Order } from "../../models/order.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus, paymentStatus } = req.body;

        const updateData = {};
        if (orderStatus) updateData.orderStatus = orderStatus;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;

        const order = await Order.findByIdAndUpdate(id, updateData, { new: true });

        if (!order) {
            return sendError(res, {
                message: "Order not found",
                statusCode: 404,
            });
        }

        return sendSuccess(res, {
            data: order,
            message: "Order updated successfully",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Failed to update order" });
    }
};
