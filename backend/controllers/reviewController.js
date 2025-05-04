// controllers/reviewController.js
const Review = require("../models/reviewModel");
const Notice = require("../models/noticeModel");
const db = require("../config/db");

exports.addReview = async (req, res) => {
    const reviewer_id = req.user.id;
    const { booking_id, rating, comment } = req.body;

    try {
        // 💡 限制 1：是否已经存在该订单的评价
        const [[existing]] = await db.query(
            "SELECT id FROM booking_review WHERE booking_id = ?",
            [booking_id]
        );
        if (existing) {
            return res.status(400).json({
                status: "error",
                message: "This booking has already been reviewed."
            });
        }

        // 💡 限制 2：只有已完成订单才能评价
        const [[booking]] = await db.query(
            "SELECT sitter_id, status FROM booking WHERE id = ?",
            [booking_id]
        );
        if (!booking || booking.status !== "completed") {
            return res.status(400).json({
                status: "error",
                message: "You can only review a completed booking."
            });
        }
        const sitter_id = booking.sitter_id;
        await Review.addReview({ booking_id, reviewer_id, sitter_id, rating, comment });
        // 通知
        Notice.createNotice(
            sitter_id,
            "New Review Received",
            `You have received a new review for booking, which id is: ${booking_id}.`
        );
        res.status(200).json({
            status: "success",
            message: "Review submitted"
        });
    } catch (err) {
        console.error("Error in addReview:", err);
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.getReviewsBySitter = async (req, res) => {
    const { sitterId } = req.params;

    try {
        const reviews = await Review.getReviewsBySitter(sitterId);
        res.json({ status: "success", reviews });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.getReviewsByBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const reviews = await Review.getReviewsByBooking(bookingId);
        res.json({ status: "success", reviews });
    } catch (err) {
        console.error("Error in getReviewsByBooking:", err);
        res.status(500).json({ status: "error", message: err.message });
    }
};
