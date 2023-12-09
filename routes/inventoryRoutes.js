// routes/inventoryRoutes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const inventoryController = require("../controllers/inventoryController");

// Update book quantity in inventory (admin-only route)
router.put(
    "/inventory/:bookId",
    authMiddleware,
    isAdminMiddleware,
    inventoryController.updateBookQuantity
);

module.exports = router;
