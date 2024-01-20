const express = require("express");
const router = express.Router();
const { validateToken } = require('../middleware/JWT');
const {
    deleteItinerary
} = require('../controller/itineraryController.js');

router.delete("/deleteItinerary/:id", validateToken, deleteItinerary);

module.exports = router;