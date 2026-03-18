import { Order } from "../../models/order.model.js";
import { sendSuccess, sendError } from "../../utils/responseHelper.js";

export const createOrder = async (req, res) => {
    try {
        const { user, customer, items, totalAmount, paymentMethod, notes } = req.body;

        if (!user || !customer || !items || !totalAmount || !paymentMethod) {
            return sendError(res, {
                message: "All required fields must be provided",
                statusCode: 400,
            });
        }

        if (!items.length) {
            return sendError(res, {
                message: "Order must contain at least one item",
                statusCode: 400,
            });
        }

        const count = await Order.countDocuments();
        const orderNumber = `ORD-${String(count + 1).padStart(5, "0")}`;

        const order = await Order.create({
            orderNumber,
            user,
            customer,
            items,
            totalAmount,
            paymentMethod,
            notes,
        });

        return sendSuccess(res, {
            data: order,
            message: "Order placed successfully",
            statusCode: 201,
        });
    } catch (error) {
        console.error(error);
        return sendError(res, { message: "Failed to create order" });
    }
};
