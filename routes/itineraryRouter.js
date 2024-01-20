// itineraryRouter.js
const express = require('express');
const router = express.Router();
const itineraryController = require('../controller/itineraryController');

router.put('/:id', itineraryController.editItinerary);

module.exports = router;    