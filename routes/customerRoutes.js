const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

// User registration
router.post("/register", customerController.register);

// User login
router.post("/login", customerController.login);

// Other customer-specific routes...

module.exports = router;
