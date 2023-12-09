const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// Place an order (customer-only route)
router.post("/", authMiddleware, orderController.placeOrder);

// Track order status (customer-only route)
router.get("/:orderId", authMiddleware, orderController.trackOrderStatus);

// Other order-related routes...

module.exports = router;
