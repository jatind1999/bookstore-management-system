const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Customer = require("../models/Customer");
dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            try {
                token = req.headers.authorization.split(" ")[1];
                console.log(token);
                // Decodes token id
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(`Customer Id: ${decoded.customerId}`);
                // Find the user based on the decoded information
                const user = await Customer.findById(decoded.customerId);

                if (!user) {
                    return res
                        .status(401)
                        .json({ error: "Unauthorized - Invalid token." });
                }

                // Attach the user information to the request object
                req.user = user;
                next();
            } catch (error) {
                console.error("Error decoding token:", error);
                return res
                    .status(401)
                    .json({ error: "Unauthorized - Invalid token." });
            }
        } else {
            return res
                .status(401)
                .json({ error: "Unauthorized - Missing or invalid token." });
        }
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = authMiddleware;
