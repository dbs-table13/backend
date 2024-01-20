const express = require('express');
const router = express.Router();

const itineraryController = require('../controller/itineraryController');
const createDestination = require('../controller/createDestination');

const { validateToken } = require('../middleware/JWT');

router.delete("/deleteItinerary/:id", validateToken, itineraryController.deleteItinerary);

router.get('/:user_id', validateToken, itineraryController.getItineraries);
router.post('/createDestination', validateToken, createDestination.createDestination);

module.exports = router;