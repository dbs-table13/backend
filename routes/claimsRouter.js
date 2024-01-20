// claimsRoutes.js
const express = require('express');
const router = express.Router();
const claimsController = require('../controller/claimsController');
const returnItineraries = require('../controller/returnItineraries');

router.get('/', claimsController.getAllClaims);
router.get('/:id', claimsController.getClaimById);
router.post('/', claimsController.createClaim);

router.get('/itinerary/:user_id', returnItineraries.getItineraries);

module.exports = router;
