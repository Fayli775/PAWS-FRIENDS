// routes/noticeRoutes.js
const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/noticeController");
const authMiddleware = require("../middleware/authMiddleware");

// Get my messages
router.get("/my", authMiddleware, noticeController.getMyNotice);
// View my messages
router.put("/:noticeId/read", authMiddleware, noticeController.readNotice);

module.exports = router;
