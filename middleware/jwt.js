const { sign, verify } = require("jsonwebtoken");
require('dotenv').config();

const createToken = (user) => {
    const accessToken = sign(
        { id: user.id, username: user.username }, // Use 'id' from the database as 'employee_id'
        process.env.ACCESS_TOKEN_SECRET
    );
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.status(400).json({ error: "User not Authenticated!" });
    }

    try {
        const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (validToken) {
            // Extract user information from the token payload
            req.user = {
                employee_id: validToken.id, // Map 'id' from the token payload to 'employee_id'
                username: validToken.username // Assuming 'user_type' is not used, or you can map it accordingly
            };
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

module.exports = { createToken, validateToken };
