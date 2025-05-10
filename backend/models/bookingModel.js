const db = require("../config/db");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { toUTCDateTime } = require("../utils/time");

// 1. Create a new booking
exports.createBooking = async (bookingData) => {
  const {
    owner_id,
    sitter_id,
    pet_type,
    pet_id,
    service_type,
    start_time,
    end_time,
    language,
  } = bookingData;

  const formattedStart = dayjs(start_time).utc().format("YYYY-MM-DD HH:mm:ss");
  const formattedEnd = dayjs(end_time).utc().format("YYYY-MM-DD HH:mm:ss");
  const [result] = await db.execute(
    `INSERT INTO booking (owner_id, sitter_id, pet_type, pet_id, service_type, start_time, end_time, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      owner_id,
      sitter_id,
      pet_type,
      pet_id,
      service_type,
      formattedStart,
      formattedEnd,
      language,
    ]
  );
  const bookingId = result.insertId;
  const nowUTC = toUTCDateTime();

  // Add log entry for the initial booking status
  await db.query(
    `INSERT INTO booking_status_log (booking_id, status, note, changed_at) VALUES (?, ?, ?, ?)`,
    [bookingId, "pending", "Booking created", nowUTC]
  );

  return bookingId;
};

// Update booking status (e.g., accept, reject, complete, etc.)
exports.updateBookingStatus = async (bookingId, newStatus, note = null) => {
  await db.query(`UPDATE booking SET status = ? WHERE id = ?`, [
    newStatus,
    bookingId,
  ]);
  const nowUTC = toUTCDateTime();
  await db.query(
    `INSERT INTO booking_status_log (booking_id, status, note, changed_at) VALUES (?, ?, ?, ?)`,
    [bookingId, newStatus, note, nowUTC]
  );
};

// Get all bookings for a specific sitter
exports.getBookingsBySitter = async (sitter_id) => {
  const [rows] = await db.query(
    `select * from booking
      where sitter_id = ?`,
    [sitter_id]
  );
  return rows;
};

// Get all bookings for a specific user
exports.getBookingsByUser = async (user_id) => {
  const [rows] = await db.query(
    `select * from booking
      where owner_id = ?`,
    [user_id]
  );
  return rows;
};
