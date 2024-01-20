/**
 * Author: Deeksha Sridhar
 * Last Modified: 20th Jan 2024
 */

const { sign, verify } = require("jsonwebtoken");
require('dotenv').config();

/**
 * Creates a new access token for the given user.
 * @param {object} user - The user object containing 'id' and 'username' properties.
 * @returns {string} accessToken - The generated access token.
 */
const createToken = (user) => {
    // Use 'id' from the database as 'employee_id'
    const accessToken = sign(
        { id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET
    );
    return accessToken;
};

/**
 * Middleware function to validate the access token in the request headers.
 * If the token is valid, it extracts user information and attaches it to the request.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {object} - Responds with an error message if the token is missing or invalid.
 */
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
