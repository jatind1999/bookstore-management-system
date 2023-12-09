const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered"],
        default: "Pending",
    },
    orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
