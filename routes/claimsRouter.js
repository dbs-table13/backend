// claimsRoutes.js
const express = require('express');
const router = express.Router();
const claimsController = require('../controller/claimsController');

router.get('/', claimsController.getAllClaims);
router.get('/:id', claimsController.getClaimById);
router.post('/', claimsController.createClaim);

module.exports = router;
