// models/bookingModel.js
const db = require("../config/db");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const { toUTCDateTime } = require("../utils/time");

// 1. 创建新预约
exports.createBooking = async (bookingData) => {
    const {
        owner_id,
        sitter_id,
        pet_type,
        service_type,
        start_time,
        end_time,
    } = bookingData;

    const formattedStart = dayjs(start_time).utc().format("YYYY-MM-DD HH:mm:ss");
    const formattedEnd = dayjs(end_time).utc().format("YYYY-MM-DD HH:mm:ss");

    const [result] = await db.query(
        `INSERT INTO booking (owner_id, sitter_id, pet_type, service_type, start_time, end_time)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [owner_id, sitter_id, pet_type, service_type, formattedStart, formattedEnd]
    );

    const bookingId = result.insertId;
    const nowUTC = toUTCDateTime();

    // 插入初始状态日志
    await db.query(
        `INSERT INTO booking_status_log (booking_id, status, note, changed_at) VALUES (?, ?, ?, ?)`,
        [bookingId, 'pending', 'Booking created', nowUTC]
    );

    return bookingId;
};

// 2. 更新预约状态（例如确认接单、拒绝、完成等）
exports.updateBookingStatus = async (bookingId, newStatus, note = null) => {
    await db.query(
        `UPDATE booking SET status = ? WHERE id = ?`,
        [newStatus, bookingId]
    );

    const nowUTC = toUTCDateTime();

    await db.query(
        `INSERT INTO booking_status_log (booking_id, status, note, changed_at) VALUES (?, ?, ?, ?)`,
        [bookingId, newStatus, note, nowUTC]
    );
};
