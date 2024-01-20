const express = require("express");
const router = express.Router();
const {
    userLogin, 
    logoutUser
} = require('../controller/userController.js');

// router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", logoutUser);

module.exports = router;
