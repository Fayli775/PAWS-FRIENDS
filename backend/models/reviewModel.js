// models/reviewModel.js
const db = require("../config/db");
const { toUTCDateTime } = require("../utils/time");

// 添加评价
exports.addReview = async (review) => {
    const { booking_id, reviewer_id, sitter_id, rating, comment } = review;
    const created_at = toUTCDateTime();

    await db.query(
        `INSERT INTO booking_review (booking_id, reviewer_id, sitter_id, rating, comment, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [booking_id, reviewer_id, sitter_id, rating, comment, created_at]
    );
};

// 获取某个 sitter 收到的所有评价
exports.getReviewsBySitter = async (sitterId) => {
    const [rows] = await db.query(
        `SELECT rating, comment, created_at, reviewer_id FROM booking_review WHERE sitter_id = ? ORDER BY created_at DESC`,
        [sitterId]
    );
    return rows;
};
