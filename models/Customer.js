const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false, // Default value is false for all users
    },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
