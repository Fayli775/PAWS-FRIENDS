const db = require("../config/db");

exports.setAvailability = async (user_id, slots) => {
  await db.query("DELETE FROM availability WHERE user_id = ?", [user_id]);

  if (!Array.isArray(slots) || slots.length === 0) {
    return;
  }

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

exports.deleteAvailabilityByUser = async (user_id) => {
  await db.query("DELETE FROM availability WHERE user_id = ?", [user_id]);
};

//check time_slot 
exports.getBookedSlotsByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT 
            DATE_FORMAT(start_time, '%H:%i') AS start_time, 
            DATE_FORMAT(end_time, '%H:%i') AS end_time, 
            DAYNAME(start_time) AS weekday
         FROM booking 
         WHERE sitter_id = ? 
         AND status IN ('pending', 'accepted')`,
    [user_id]
  );
  return rows;
};
