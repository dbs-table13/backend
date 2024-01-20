const express = require('express');
const router = express.Router();
const returnItineraries = require('../controller/returnItineraries');
const createDestination = require('../controller/createDestination');

router.get('/:user_id', returnItineraries.getItineraries);
router.post('/createDestination', createDestination.createDestination);

module.exports = router;