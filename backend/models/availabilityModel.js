const db = require("../config/db");
exports.setAvailability = async (user_id, slots) => {
  // Delete existing available time slots for the user
  await db.query("DELETE FROM availability WHERE user_id = ?", [user_id]);
  // Store the user-selected local time directly (no longer converting to UTC)
  const values = slots.map((slot) => [
    user_id,
    slot.weekday,
    slot.start_time,
    slot.end_time,
  ]);

  await db.query(
    "INSERT INTO availability (user_id, weekday, start_time, end_time) VALUES ?",
    [values]
  );
};

exports.getAvailabilityByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT weekday, start_time, end_time
     FROM availability
     WHERE user_id = ?
     ORDER BY FIELD(weekday, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), start_time`,
    [user_id]
  );
  return rows;
};

// Delete the user's available time slots
exports.deleteAvailabilityByUser = async (user_id) => {
  await db.query("DELETE FROM availability WHERE user_id = ?", [user_id]);
};
