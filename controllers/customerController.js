// controllers/customerController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const {
    generateAuthToken,
    hashPassword,
    comparePasswords,
} = require("../config/auth");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if required fields are provided
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ error: "Username, email, and password are required." });
        }

        // Check if the email is unique
        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {
            return res
                .status(400)
                .json({ error: "Email is already registered." });
        }

        // Hash the password before storing it
        const hashedPassword = await hashPassword(password);

        // Create a new customer
        const newCustomer = new Customer({
            username,
            email,
            password: hashedPassword,
        });

        // Save the customer to the database
        await newCustomer.save();

        // Generate and send the authentication token
        const token = generateAuthToken(newCustomer);
        res.json({ token });
    } catch (error) {
        console.error("Error registering customer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if required fields are provided
        if (!email || !password) {
            return res.redirect(
                "/customer/login?loginError=" +
                    encodeURIComponent("Email and password are required.")
            );
        }

        // Check if the email exists in the database
        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.redirect(
                "/customer/login?loginError=" +
                    encodeURIComponent("Invalid email or password.")
            );
        }

        // Compare passwords
        const passwordMatch = await comparePasswords(
            password,
            customer.password
        );

        if (!passwordMatch) {
            return res.redirect(
                "/customer/login?loginError=" +
                    encodeURIComponent("Invalid email or password.")
            );
        }

        // Generate and send the authentication token
        const token = generateAuthToken(customer);

        // Set cookies on successful login
        res.cookie("username", customer.username);
        res.cookie("isAdmin", customer.isAdmin || false);
        res.cookie("authToken", token); // Set the authentication token cookie

        // Redirect to the home page with a success message
        res.redirect(
            "/?loginSuccess=" +
                encodeURIComponent("Login successful! Welcome back.")
        );
    } catch (error) {
        console.error("Error logging in customer:", error);
        res.redirect(
            "/customer/login?loginError=" +
                encodeURIComponent("Internal Server Error")
        );
    }
};

module.exports = {
    register,
    login,
};
