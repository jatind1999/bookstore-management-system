const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: "Book not found." });
        }

        res.json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const addNewBook = async (req, res) => {
    try {
        const { title, author, genre, price, quantity } = req.body;

        // Check if required fields are provided
        if (!title || !author || !genre || !price || !quantity) {
            return res.status(400).json({
                error: "Title, author, genre, price, and quantity are required.",
            });
        }

        // Create a new book
        const newBook = new Book({
            title,
            author,
            genre,
            price,
            quantity,
        });

        // Save the book to the database
        await newBook.save();

        res.json({ message: "Book added successfully." });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, genre, price, quantity } = req.body;

        // Check if required fields are provided
        if (!title || !author || !genre || !price || !quantity) {
            return res.status(400).json({
                error: "Title, author, genre, price, and quantity are required.",
            });
        }

        // Check if the book exists
        const existingBook = await Book.findById(id);

        if (!existingBook) {
            return res.status(404).json({ error: "Book not found." });
        }

        // Update the book
        existingBook.title = title;
        existingBook.author = author;
        existingBook.genre = genre;
        existingBook.price = price;
        existingBook.quantity = quantity;

        await existingBook.save();

        res.json({ message: "Book updated successfully." });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the book exists
        const existingBook = await Book.findById(id);

        if (!existingBook) {
            return res.status(404).json({ error: "Book not found." });
        }

        // Remove the book from the database using findOneAndDelete
        await Book.findOneAndDelete({ _id: id });

        res.json({ message: "Book deleted successfully." });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const search = async (req, res) => {
    try {
        const { title, author, genre } = req.query;
        const searchCriteria = {};

        if (title) {
            searchCriteria.title = { $regex: new RegExp(title, "i") }; // Case-insensitive search
        }

        if (author) {
            searchCriteria.author = { $regex: new RegExp(author, "i") };
        }

        if (genre) {
            searchCriteria.genre = { $regex: new RegExp(genre, "i") };
        }

        const searchResults = await Book.find(searchCriteria);

        res.json(searchResults);
    } catch (error) {
        console.error("Error searching for books:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    addNewBook,
    updateBook,
    deleteBook,
    search,
};
