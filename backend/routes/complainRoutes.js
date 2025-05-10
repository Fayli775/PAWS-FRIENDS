const express = require("express");
const router = express.Router();
const complainController = require("../controllers/complainController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/", authMiddleware, complainController.addComplain);
router.get("/booking/:bookingId", complainController.getComplainByBooking);

module.exports = router;
