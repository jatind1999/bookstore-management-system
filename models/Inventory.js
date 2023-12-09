const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        unique: true,
        required: true,
    },
    quantity: { type: Number, required: true },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
