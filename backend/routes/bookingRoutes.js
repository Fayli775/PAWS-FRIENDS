const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);
router.put("/:id/status", bookingController.updateBookingStatus);
router.get("/user/:userId", bookingController.getBookingsByUser);
router.get("/sitter/:sitterId", bookingController.getBookingsBySitter);
module.exports = router;
