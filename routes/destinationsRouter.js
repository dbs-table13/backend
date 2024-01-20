// destinationsRouter.js
const express = require('express');
const router = express.Router();
const destinationsController = require('../controller/destinationsController');

router.put('/:id', destinationsController.editDestination);
router.delete('/:id', destinationsController.deleteDestination)

module.exports = router;    