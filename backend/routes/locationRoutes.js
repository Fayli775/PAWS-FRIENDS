const express = require('express');
const locationController = require('../controllers/locationController');
const router = express.Router();
// GET /api/locations
router.get('/', locationController.getAllLocations);

module.exports = router; 