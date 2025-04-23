const express = require('express');
const locationController = require('../controllers/locationController');
// Potentially add authentication middleware later if needed for adding locations/location_reviews
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Define the route to get all locations
// GET /api/locations
router.get('/', locationController.getAllLocations);

// Add other location-related routes here later if needed
// e.g., POST /api/locations (to add a new location - likely needs 'protect' middleware)
// e.g., POST /api/locations/:locationId/location_reviews (to add a review - needs 'protect' middleware)
// e.g., GET /api/locations/:locationId (to get details for one location)

module.exports = router; 