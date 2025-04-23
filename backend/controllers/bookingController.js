// controllers/bookingController.js
const Booking = require("../models/bookingModel");

// 创建新预约
exports.createBooking = async (req, res) => {
    try {
        const bookingId = await Booking.createBooking(req.body);
        res.status(201).json({ status: "success", bookingId });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

// 更新预约状态（accept / reject / complete）
exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status, note } = req.body;

    try {
        await Booking.updateBookingStatus(id, status, note);
        res.json({ status: "success", message: `Booking ${id} updated to ${status}` });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

// 获取某用户的所有订单
exports.getBookingsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.getBookingsByUser(userId);
        res.json({ status: "success", bookings });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

// 获取某服务者的所有订单
exports.getBookingsBySitter = async (req, res) => {
    const { sitterId } = req.params;

    try {
        const bookings = await Booking.getBookingsBySitter(sitterId);
        res.json({ status: "success", bookings });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};
