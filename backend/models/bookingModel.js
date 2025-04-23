// models/bookingModel.js
const db = require("../config/db");

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

    const [result] = await db.query(
        `INSERT INTO booking (owner_id, sitter_id, pet_type, service_type, start_time, end_time)
     VALUES (?, ?, ?, ?, ?, ?)`,
        [owner_id, sitter_id, pet_type, service_type, start_time, end_time]
    );

    const bookingId = result.insertId;

    // 插入初始状态日志
    await db.query(
        `INSERT INTO booking_status_log (booking_id, status, note) VALUES (?, ?, ?)`,
        [bookingId, 'pending', 'Booking created']
    );

    return bookingId;
};

// 2. 更新预约状态（例如确认接单、拒绝、完成等）
exports.updateBookingStatus = async (bookingId, newStatus, note = null) => {
    await db.query(
        `UPDATE booking SET status = ? WHERE id = ?`,
        [newStatus, bookingId]
    );

    await db.query(
        `INSERT INTO booking_status_log (booking_id, status, note) VALUES (?, ?, ?)`,
        [bookingId, newStatus, note]
    );
};

// 3. 根据用户 ID 获取所有订单（宠物主视角）
exports.getBookingsByUser = async (userId) => {
    const [rows] = await db.query(
        `SELECT * FROM booking WHERE owner_id = ? ORDER BY created_at DESC`,
        [userId]
    );
    return rows;
};

// 4. 根据服务者 ID 获取所有订单（服务者视角）
exports.getBookingsBySitter = async (sitterId) => {
    const [rows] = await db.query(
        `SELECT * FROM booking WHERE sitter_id = ? ORDER BY created_at DESC`,
        [sitterId]
    );
    return rows;
};
