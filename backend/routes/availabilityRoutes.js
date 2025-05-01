// routes/availabilityRoutes.js
const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:userId", availabilityController.getAvailabilityByUser); // 公共查看
router.post("/", authMiddleware, availabilityController.setAvailability); // sitter 设置
router.delete("/:userId", availabilityController.deleteAvailabilityByUser);

module.exports = router;
