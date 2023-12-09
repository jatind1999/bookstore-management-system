// routes/index.js

const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Controller
router.get("/", async (req, res) => {
    try {
        // Fetch all books from the database
        const books = await Book.find().lean();

        // Check if the user is an admin based on the presence of the isAdmin cookie
        res.locals.isAdmin = req.cookies.isAdmin === "true";
        const isAdmin = res.locals.isAdmin;

        // Render the book index template with the fetched books
        res.render("book/index", { books, isAdmin });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/book/add", (req, res) => {
    res.render("book/add");
});

// Logout route
router.get("/logout", (req, res) => {
    // Clear cookies on logout
    res.clearCookie("username");
    res.clearCookie("isAdmin");
    res.clearCookie("authToken");

    // Redirect to the home page or login page
    res.redirect("/");
});
router.get("/books", (req, res) => {
    // Handle rendering the books page
});

router.get("/customer/register", (req, res) => {
    res.render("customer/register");
});

router.get("/customer/login", (req, res) => {
    res.render("customer/login");
});

module.exports = router;
