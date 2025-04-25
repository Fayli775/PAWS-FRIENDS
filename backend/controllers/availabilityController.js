// controllers/availabilityController.js
const Availability = require("../models/availabilityModel");

exports.setAvailability = async (req, res) => {
    const userId = req.user.id;
    const slots = req.body;

    try {
        await Availability.setAvailability(userId, slots);
        res.json({ status: "success", message: "Availability updated" });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.getAvailabilityByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const data = await Availability.getAvailabilityByUser(userId);
        res.json({ status: "success", availability: data });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};
