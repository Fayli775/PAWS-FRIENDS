// backend/routes/dogs.js
const express = require("express");
const router = express.Router();

// GET /api/dogs
router.get("/", (req, res) => {
  res.json({ message: "🐶 Dogs endpoint reached!" });
});



module.exports = router;
