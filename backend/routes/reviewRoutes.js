// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

// 提交订单评价
router.post("/", authMiddleware, reviewController.addReview);

// 查看 sitter 的所有评价
router.get("/sitter/:sitterId", reviewController.getReviewsBySitter);

module.exports = router;
