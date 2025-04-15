const User = require("../models/userModel");
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.getById(id);
    if (user) {
      res.json({ status: "success", user });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};