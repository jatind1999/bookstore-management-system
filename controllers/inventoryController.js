const Inventory = require("../models/Inventory");

const updateBookQuantity = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { quantity } = req.body;

        // Check if bookId and quantity are provided
        if (!bookId || !quantity) {
            return res
                .status(400)
                .json({ error: "Book ID and quantity are required." });
        }

        // Check if the book is in the inventory
        let inventoryItem = await Inventory.findOne({ book: bookId });

        if (!inventoryItem) {
            return res
                .status(404)
                .json({ error: "Book not found in inventory." });
        }

        // Update book quantity
        inventoryItem.quantity = quantity;
        await inventoryItem.save();

        res.json({ message: "Book quantity updated successfully." });
    } catch (error) {
        console.error("Error updating book quantity:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    updateBookQuantity,
};
