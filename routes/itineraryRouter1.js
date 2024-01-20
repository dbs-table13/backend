// claimsRoutes.js
const express = require('express');
const router = express.Router();
const itineraryController = require('../controller/itineraryController1');
const { validateToken } = require('../middleware/JWT');

router.post('/create', validateToken, itineraryController.createItinerary);

module.exports = router;
