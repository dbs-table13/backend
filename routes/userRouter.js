const express = require("express");
const router = express.Router();
const {
    userLogin, 
    logoutUser
} = require('../controller/userController.js');

/**
 * Express Router for user-related authentication endpoints.
 * @module routes/auth
 */

/**
 * POST /login - Handles user login requests.
 * @function
 * @name POST /auth/login
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {json} - Returns a JSON response indicating successful login or error.
 * @throws {json} - Returns a JSON response for internal server errors.
 */
router.post("/login", userLogin);

/**
 * POST /logout - Handles user logout requests.
 * @function
 * @name POST /auth/logout
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {json} - Returns a JSON response indicating successful logout or error.
 * @throws {json} - Returns a JSON response for internal server errors.
 */
router.post("/logout", logoutUser);

module.exports = router;
