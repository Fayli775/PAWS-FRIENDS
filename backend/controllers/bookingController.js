const Booking = require("../models/bookingModel");
const Notice = require("../models/noticeModel");
const { parseFrontendTimeSlot } = require("../utils/time");

// 创建新预约
exports.createBooking = async (req, res) => {
    try {
        const {
            owner_id,
            sitter_id,
            pet_type,
            pet_id,
            service_type,
            weekday,        // ⬅ 前端传入的 weekday（例如 "Mon"）
            time_slot,     // ⬅ 前端传入的时间段（例如 "09:00–10:00"）
            language // ✅ 加这一行

        } = req.body;

        // ⏱️ 拼出标准 UTC 起止时间
        const { start_time, end_time } = parseFrontendTimeSlot(weekday, time_slot);
        console.log("Parsed start_time:", start_time);
        console.log("Parsed end_time:", end_time);

        // 封装成 booking 对象传入 model
        const bookingData = {
            owner_id,
            sitter_id,
            pet_type,
            pet_id,
            service_type,
            start_time,
            end_time,
            language,   // ✅ 新增
        };

        const bookingId = await Booking.createBooking(bookingData);
        Notice.createNotice(sitter_id, 'new booking', 'You have received a new booking. Please check your bookings.');
        res.status(201).json({ status: "success", bookingId });
    } catch (err) {
        console.error("Error creating booking:", err);
        res.status(500).json({ status: "error", message: err.message });
    }
};

// 更新预约状态（accept / reject / complete）
exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status, note } = req.body;

    try {
        await Booking.updateBookingStatus(id, status, note);
        // 发送通知给用户
        Notice.createNotice(id, 'booking status change', `Your booking status has been updated to ${status}.`);
        res.json({ status: "success", message: `Booking ${id} updated to ${status}` });
    } catch (err) {
        console.error("Error updating booking status:", err);
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
