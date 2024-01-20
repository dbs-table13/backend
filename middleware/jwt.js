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
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: Access Token is missing or invalid' });
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            return res.status(401).json({ error: 'Unauthorized: Access Token is missing or invalid' });
        }

        const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        if (validToken) {
            // Extract user information from the token payload
            req.user = {
                employee_id: validToken.id,
                username: validToken.username
            };
            return next();
        }
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid Access Token' });
    }

    return res.status(401).json({ error: 'Unauthorized: Access Token is missing or invalid' });
};


module.exports = { createToken, validateToken };
