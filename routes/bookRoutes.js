// routes/bookRoutes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const Book = require("../models/Book");
const bookController = require("../controllers/bookController");

// Display all books
router.get("/", bookController.getAllBooks);

// Display a specific book
router.get("/:id", bookController.getBookById);

// Add a new book (admin-only route)
router.post("/", authMiddleware, isAdminMiddleware, bookController.addNewBook);

// Update a book (admin-only route)
router.put(
    "/:id",
    authMiddleware,
    isAdminMiddleware,
    bookController.updateBook
);

// Delete a book (admin-only route)
router.delete(
    "/:id",
    authMiddleware,
    isAdminMiddleware,
    bookController.deleteBook
);

// Search for books
router.get("/search", bookController.search);

module.exports = router;
