import { Order } from "../../models/order.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return sendError(res, {
                message: "Order not found",
                statusCode: 404,
            });
        }

        return sendSuccess(res, {
            data: order,
            message: "Order deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Failed to delete order" });
    }
};
