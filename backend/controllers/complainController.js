// controllers/reviewController.js
const complainRepository = require("../models/complainModel");
const Notice = require("../models/noticeModel");
const db = require("../config/db");

exports.addComplain = async (req, res) => {
    const reviewer_id = req.user.id;
    const { booking_id, content } = req.body;

    try {
        // 💡 限制 1：是否已经存在该订单的投诉
        const [[existing]] = await db.query(
            "SELECT id FROM booking_complain WHERE booking_id = ?",
            [booking_id]
        );
        if (existing) {
            return res.status(400).json({
                status: "error",
                message: "This booking has already been complained."
            });
        }

        // 💡 限制 2：只有已完成订单才能投诉
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
        await complainRepository.addComplain({ booking_id, reviewer_id, sitter_id, content });
        // 创建通知
        Notice.createNotice(sitter_id,"New Complain", `You have a new complain for booking which number is: ${booking_id}.`);
        res.status(200).json({
            status: "success",
            message: "Review submitted"
        });
    } catch (err) {
        console.error("Error in addReview:", err);
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.getComplainByBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const complain = await complainRepository.getComplainByBooking(bookingId);
        res.json({ status: "success", complain });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};
