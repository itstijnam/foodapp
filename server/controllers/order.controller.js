import { Food } from "../models/food.model.js";
import { Order } from "../models/order.model.js";

export const createOrder = async (req, res) => {
    try {
        const { user, items, address } = req.body;

        if (!user || !items || items.length === 0 || !address) {
            return res.status(400).json({ success: false, message: "Please provide user, items, and address" });
        }

        // Calculate total amount
        let totalAmount = 0;
        for (const item of items) {
            const foodItem = await Food.findById(item.food);
            if (!foodItem) {
                return res.status(404).json({ success: false, message: `Food item with ID ${item.food} not found` });
            }
            totalAmount += item.price * (item.quantity || 1);
        }

        const order = await Order.create({
            user,
            items,
            totalAmount,
            address
        });

        return res.status(201).json({ success: true, message: "Order placed successfully", order });
    } catch (error) {
        console.error("Error in createOrder:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "person_name email")
            .populate("items.food", "foodname image_link");

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * ✅ Get order by ID
 */
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate("user", "person_name email")
            .populate("items.food", "foodname image_link");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error in getOrderById:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateOrderStatusByOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const userId = req.id;

        const allowedStatuses = ["preparing", "onway", "cancelled"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: `Invalid status for owner. Allowed: ${allowedStatuses.join(", ")}` });
        }

        // ✅ Check if logged-in user is App Owner
        const user = await User.findById(userId);
        if (!user || !user.isAppOwner) {
            return res.status(403).json({ success: false, message: "Only app owners can update this status" });
        }

        // ✅ Update order
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, message: `Order status updated to ${status}`, order });
    } catch (error) {
        console.error("Error in updateOrderStatusByOwner:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


/**
 * ✅ Update status by Customer (B) → delivered, cancelled
 */
export const updateOrderStatusByCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const userId = req.id; // from JWT

        const allowedStatuses = ["delivered", "cancelled"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: `Invalid status for customer. Allowed: ${allowedStatuses.join(", ")}` });
        }

        // ✅ Fetch order
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // ✅ Ensure the logged-in user is the owner of this order
        if (order.user.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You cannot update someone else's order" });
        }

        // ✅ Update status
        order.status = status;
        await order.save();

        return res.status(200).json({ success: true, message: `Order status updated to ${status}`, order });
    } catch (error) {
        console.error("Error in updateOrderStatusByCustomer:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


/**
 * ✅ Get all orders by a user (Customer B)
 */
export const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ user: userId })
            .populate("items.food", "foodname image_link");

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error in getOrdersByUser:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

/**
 * ✅ Delete order (Optional) - Owner only or Admin
 */
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error in deleteOrder:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
