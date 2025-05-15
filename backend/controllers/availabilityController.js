const Availability = require("../models/availabilityModel");

exports.setAvailability = async (req, res) => {
    const userId = req.user.id;
    const slots = req.body;

    try {
        await Availability.setAvailability(userId, slots);
        res.json({ status: "success", message: "Availability updated" });
    } catch (err) {
        console.error("Error setting availability:", err);
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.getAvailabilityByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const data = await Availability.getAvailabilityByUser(userId);
        const bookedSlots = await Availability.getBookedSlotsByUser(userId); // added this to check time slot

        res.json({ status: "success", availability: data, bookedSlots });
    } catch (err) {
        console.error("Error getting availability:", err);
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.deleteAvailabilityByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        await Availability.deleteAvailabilityByUser(userId);
        res.json({ status: "success", message: "Availability deleted" });
    } catch (err) {
        console.error("Error deleting availability:", err);
        res.status(500).json({ status: "error", message: err.message });
    }
};
