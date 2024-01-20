// claimsRoutes.js
const express = require('express');
const router = express.Router();
const itineraryController = require('../controller/itineraryController1');

router.post('/create', itineraryController.createItinerary);

module.exports = router;
