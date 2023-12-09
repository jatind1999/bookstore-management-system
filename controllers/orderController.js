const Order = require("../models/Order");

const placeOrder = async (req, res) => {
    try {
        const { items } = req.body;

        // Check if items are provided
        if (!items || items.length === 0) {
            return res
                .status(400)
                .json({ error: "Items are required to place an order." });
        }

        // Create a new order
        const newOrder = new Order({
            customer: req.user._id,
            items,
        });

        // Save the order to the database
        await newOrder.save();

        res.json({ message: "Order placed successfully." });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const trackOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Check if orderId is provided
        if (!orderId) {
            return res
                .status(400)
                .json({ error: "Order ID is required to track order status." });
        }

        // Check if the order belongs to the authenticated customer
        const order = await Order.findOne({
            _id: orderId,
            customer: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                error: "Order not found or does not belong to the customer.",
            });
        }

        res.json(order);
    } catch (error) {
        console.error("Error tracking order status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    placeOrder,
    trackOrderStatus,
};
