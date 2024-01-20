/**
 * Author: Deeksha Sridhar
 * Last Modified: 20th Jan 2024
 */

const connectToDatabase = require('../database.js');
const { createToken } = require('../middleware/JWT');

const connection = connectToDatabase();

/**
 * Handles user login functionality.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {json} - Returns a JSON response indicating success or failure.
 */
const userLogin = (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Query the database to check user credentials
    const query = `SELECT * FROM user WHERE username = ? AND password = ?`;
    connection.query(query, [username, password], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Check if user with provided credentials exists
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // User successfully authenticated
      const authenticatedUser = {
        id: results[0].id,
        first_name: results[0].first_name,
        last_name: results[0].last_name,
        username: results[0].username,
      };

      // Generate and return access token
      const accessToken = createToken(authenticatedUser);
      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000  // Set cookie expiration time to 30 days
      });

      res.status(200).json({ message: 'Logged In', access_token: accessToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Handles user logout functionality.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {json} - Returns a JSON response indicating success or failure.
 */
const logoutUser = (req, res) => {
  try {
    // Clear the access-token cookie
    res.clearCookie("access-token");
    res.status(200).json({ message: 'Logged Out' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { userLogin, logoutUser };
