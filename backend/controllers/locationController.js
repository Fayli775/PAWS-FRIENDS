const locationModel = require('../models/locationModel');

const locationController = {
  //Fetches locations using the model and sends a JSON response. 
  getAllLocations: async (req, res) => {
    try {
      const locations = await locationModel.getAllLocations();
      res.status(200).json({ status: 'success', data: locations });
    } catch (error) {
      console.error('Error in locationController.getAllLocations:', error.message);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve locations' });
    }
  },
};
module.exports = locationController; 