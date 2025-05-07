// routes/noticeRoutes.js
const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/noticeController");
const authMiddleware = require("../middleware/authMiddleware");

// 查看我的消息
router.get("/my", authMiddleware, noticeController.getMyNotice);

// 将消息标记为已读
router.put("/:noticeId/read", authMiddleware, noticeController.readNotice);

module.exports = router;
