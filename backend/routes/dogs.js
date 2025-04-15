// backend/routes/dogs.js
const express = require("express");
const router = express.Router();

// Example GET route
router.get("/", (req, res) => {
  res.json({ message: "🐶 Dogs endpoint reached!" });
});

module.exports = router;
