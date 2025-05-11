const pool = require("../config/db");
const locationModel = {
  /**
   * Fetches all locations from the database with their reviews.
   * @returns {Promise<Array>} A promise that resolves to an array of location objects with reviews.
   */
  getAllLocations: async () => {
    const sql = `
      SELECT 
        l.*,
        GROUP_CONCAT(
          JSON_OBJECT(
            'id', lr.id,
            'user_id', lr.user_id,
            'rating', lr.rating,
            'comment', lr.comment,
            'created_at', lr.created_at
          )
        ) as reviews
      FROM locations l
      LEFT JOIN location_reviews lr ON l.id = lr.location_id
      GROUP BY l.id
      ORDER BY l.created_at DESC
    `;

    try {
      const [rows] = await pool.query(sql);
      // Convert latitude/longitude from string to numbers and parse reviews JSON
      return rows.map((row) => ({
        ...row,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
        reviews: row.reviews ? JSON.parse(`[${row.reviews}]`) : [],
      }));
    } catch (error) {
      console.error("Error fetching locations from DB:", error);
      throw error;
    }
  },
};

module.exports = locationModel;
