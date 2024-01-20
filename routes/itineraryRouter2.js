const express = require('express');
const router = express.Router();
const returnItineraries = require('../controller/returnItineraries');

router.get('/:user_id', returnItineraries.getItineraries);

module.exports = router;