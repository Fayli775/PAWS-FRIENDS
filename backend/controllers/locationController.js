const locationModel = require('../models/locationModel');

const locationController = {
  /**
   * Handles request to get all locations.
   * Fetches locations using the model and sends a JSON response.
   */
  getAllLocations: async (req, res) => {
    try {
      const locations = await locationModel.getAllLocations();
      res.status(200).json({ status: 'success', data: locations });
    } catch (error) {
      // The model already logged the specific DB error
      console.error('Error in locationController.getAllLocations:', error.message);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve locations' });
    }
  },

  // --- Future controller actions could go here ---
  // e.g., handleAddLocation, handleAddReview etc.

};

module.exports = locationController; 