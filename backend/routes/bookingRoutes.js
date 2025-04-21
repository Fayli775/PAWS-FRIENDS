// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// 创建新预约
router.post("/", bookingController.createBooking);

// 更新预约状态（accept, reject, complete）
router.put("/:id/status", bookingController.updateBookingStatus);

// 获取宠物主的所有订单
router.get("/user/:userId", bookingController.getBookingsByUser);

// 获取服务者的所有订单
router.get("/sitter/:sitterId", bookingController.getBookingsBySitter);

module.exports = router;
