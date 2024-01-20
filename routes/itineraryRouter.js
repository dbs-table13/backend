// itineraryRouter.js
const express = require('express');
const router = express.Router();
const itineraryController = require('../controller/itineraryController');
const { validateToken } = require('../middleware/JWT');

router.put('/:id', validateToken, itineraryController.editItinerary);

module.exports = router;    