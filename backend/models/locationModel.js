const pool = require('../config/db');

const locationModel = {
  /**
   * Fetches all locations from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of location objects.
   */
  getAllLocations: async () => {
    const sql = 'SELECT * FROM locations ORDER BY created_at DESC'; // Get all columns, order by newest first
    try {
      const [rows] = await pool.query(sql);
      // Convert latitude/longitude from string (which mysql2 might return) to numbers
      return rows.map(row => ({
        ...row,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
      }));
    } catch (error) {
      console.error('Error fetching locations from DB:', error);
      throw error; // Re-throw the error to be handled by the controller
    }
  },

  // --- Future functions could go here ---
  // e.g., getLocationById, addLocation, addReview, getReviewsForLocation etc.

};

module.exports = locationModel; 