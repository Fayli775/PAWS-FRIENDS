// models/availabilityModel.js
const db = require("../config/db");
const { toUTCTimeOnly } = require("../utils/time");

exports.setAvailability = async (user_id, slots) => {
    await db.query("DELETE FROM availability WHERE user_id = ?", [user_id]);

    const values = slots.map(slot => [
        user_id,
        slot.weekday,
        toUTCTimeOnly(slot.start_time),
        toUTCTimeOnly(slot.end_time)
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
