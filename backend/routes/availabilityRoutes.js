const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:userId", availabilityController.getAvailabilityByUser); 
router.post("/", authMiddleware, availabilityController.setAvailability); 
router.delete("/:userId", availabilityController.deleteAvailabilityByUser);

module.exports = router;
