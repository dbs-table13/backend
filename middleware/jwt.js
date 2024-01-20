const {sign, verify} = require("jsonwebtoken");
require('dotenv').config();


const createToken = (user) => {
    const accessToken = sign(
        {employee_id: user.employee_id, user_type: user.user_type}, 
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
                employee_id: validToken.employee_id,
                user_type: validToken.user_type
            };
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

 module.exports = {createToken, validateToken}
