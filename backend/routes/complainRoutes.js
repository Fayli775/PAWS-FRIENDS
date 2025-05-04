// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const complainController = require("../controllers/complainController");
const authMiddleware = require("../middleware/authMiddleware");

// 提交订单评价
router.post("/", authMiddleware, complainController.addComplain);

// 查看 booking 的所有评价
router.get("/booking/:bookingId", complainController.getComplainByBooking);

module.exports = router;
