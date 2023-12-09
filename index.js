const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const connectDB = require("./config/db");
const { connect } = require("http2");

const cookieParser = require("cookie-parser");

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Set up Handlebars as the view engine
app.engine(
    "handlebars",
    expressHandlebars.engine({
        layoutsDir: path.join(__dirname, "views/layouts"),
        defaultLayout: "main",
    })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Middleware to parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: false }));

// Static files middleware to serve CSS and images
app.use(express.static(path.join(__dirname, "public")));

// middleware for cookies
app.use(cookieParser());

// MongoDB connection
connectDB();

// Define routes
app.use("/", require("./routes/index"));
app.use("/books", require("./routes/bookRoutes"));
app.use("/customers", require("./routes/customerRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/inventory", require("./routes/inventoryRoutes"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
