// destinationsRouter.js
const express = require('express');
const router = express.Router();
const destinationsController = require('../controller/destinationsController');
const { validateToken } = require('../middleware/JWT');

router.put('/:id', validateToken, destinationsController.editDestination);
router.delete('/:id', validateToken, destinationsController.deleteDestination)

module.exports = router;    