const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

// Submit a review for the booking
router.post("/", authMiddleware, reviewController.addReview);

// Get all reviews for the sitter
router.get("/sitter/:sitterId", reviewController.getReviewsBySitter);

// Get all reviews for the booking
router.get("/booking/:bookingId", reviewController.getReviewsByBooking);

module.exports = router;
