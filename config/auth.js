const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateAuthToken = (user) => {
    const token = jwt.sign({ customerId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expiration time
    });
    return token;
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const comparePasswords = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

module.exports = {
    generateAuthToken,
    hashPassword,
    comparePasswords,
};
