const db = require("../config/db");
const dayjs = require("dayjs");
const { toLocalDateTime } = require("../utils/time");

const Booking = {
  async createBooking({
    owner_id,
    sitter_id,
    pet_type,
    pet_id,
    service_type,
    start_time,
    end_time,
    language,
  }) {
    const formattedStart = dayjs(start_time).format("YYYY-MM-DD HH:mm:ss");
    const formattedEnd = dayjs(end_time).format("YYYY-MM-DD HH:mm:ss");
    const now = toLocalDateTime();

    const [result] = await db.execute(
      `INSERT INTO booking (owner_id, sitter_id, pet_type, pet_id, service_type, start_time, end_time, status, created_at, updated_at, language)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)`,
      [
        owner_id,
        sitter_id,
        pet_type,
        pet_id,
        service_type,
        formattedStart,
        formattedEnd,
        now,
        now,
        language,
      ]
    );

    return result.insertId;
  },

  async updateBookingStatus(id, status, note = null) {
    const now = toLocalDateTime();

    await db.execute(
      `UPDATE booking SET status = ?, updated_at = ? WHERE id = ?`,
      [status, now, id]
    );

    await db.execute(
      `INSERT INTO booking_status_log (booking_id, status, changed_at, note)
       VALUES (?, ?, ?, ?)`,
      [id, status, now, note]
    );
  },

  async getBookingsByUser(userId) {
    const [rows] = await db.execute(
      `SELECT * FROM booking WHERE owner_id = ? ORDER BY start_time DESC`,
      [userId]
    );
    return rows;
  },

  async getBookingsBySitter(sitterId) {
    const [rows] = await db.execute(
      `SELECT * FROM booking WHERE sitter_id = ? ORDER BY start_time DESC`,
      [sitterId]
    );
    return rows;
  },

  async getBookingById(id) {
    const [rows] = await db.execute(
      `SELECT * FROM booking WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  // check if the time-slot booked 
  async isSlotBooked(sitterId, startTime, endTime) {
    const formattedStart = dayjs(startTime).format("YYYY-MM-DD HH:mm:ss");
    const formattedEnd = dayjs(endTime).format("YYYY-MM-DD HH:mm:ss");

    const [rows] = await db.execute(
      `SELECT id FROM booking 
       WHERE sitter_id = ? 
       AND start_time = ? 
       AND end_time = ? 
       AND status IN ('pending', 'confirmed')`,
      [sitterId, formattedStart, formattedEnd]
    );

    return rows.length > 0;
  },
};
module.exports = Booking;
