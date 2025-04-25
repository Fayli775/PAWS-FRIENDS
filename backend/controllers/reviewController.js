// controllers/reviewController.js
const Review = require("../models/reviewModel");

exports.addReview = async (req, res) => {
    const reviewer_id = req.user.id; // 来自 token
    const { booking_id, sitter_id, rating, comment } = req.body;

    try {
        await Review.addReview({ booking_id, reviewer_id, sitter_id, rating, comment });
        res.status(201).json({ status: "success", message: "Review submitted" });
    } catch (err) {
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
