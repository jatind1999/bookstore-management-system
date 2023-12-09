const isAdminMiddleware = (req, res, next) => {
    try {
        // Check if the user is an admin
        if (!req.user || !req.user.isAdmin) {
            return res
                .status(403)
                .json({ error: "Forbidden - Admin access required." });
        }

        next();
    } catch (error) {
        console.error("Error in isAdminMiddleware:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = isAdminMiddleware;
