const db = require("../config/db");

// Add complaint
exports.addComplain = async (review) => {
  const { booking_id, reviewer_id, sitter_id, content } = review;

  await db.query(
    `INSERT INTO booking_complain (booking_id, reviewer_id, sitter_id, content)
         VALUES (?, ?, ?, ?)`,
    [booking_id, reviewer_id, sitter_id, content]
  );
};

// Get all complaints related to a specific booking
exports.getComplainByBooking = async (booking_id) => {
  const [rows] = await db.query(
    `SELECT id, content, booking_id, created_at, reviewer_id FROM booking_complain WHERE booking_id = ?`,
    [booking_id]
  );
  return rows;
};
