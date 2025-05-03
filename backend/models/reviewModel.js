// models/reviewModel.js
const db = require("../config/db");
const { toUTCDateTime } = require("../utils/time");

// 添加评价
exports.addReview = async (review) => {
    const { booking_id, reviewer_id, sitter_id, rating, comment } = review;

    await db.query(
        `INSERT INTO booking_review (booking_id, reviewer_id, sitter_id, rating, comment)
         VALUES (?, ?, ?, ?, ?)`,
        [booking_id, reviewer_id, sitter_id, rating, comment]
    );
};

// 获取某个 sitter 收到的所有评价
exports.getReviewsBySitter = async (sitterId) => {
    const [rows] = await db.query(
        `SELECT booking_id, rating, comment, a.created_at, reviewer_id, b.service_type, b.pet_type FROM booking_review as a
        left join booking as b on a.booking_id = b.id
        WHERE a.sitter_id = ? ORDER BY created_at DESC`,
        [sitterId]
    );
    return rows;
};

// 获取某个 sitter 收到的所有评价
exports.getReviewsByBooking = async (booking_id) => {
    const [rows] = await db.query(
        `SELECT rating, comment, created_at, reviewer_id FROM booking_review WHERE booking_id = ?`,
        [booking_id]
    );
    return rows;
};
