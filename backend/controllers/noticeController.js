const noticeRepository = require("../models/noticeModel");
const db = require("../config/db");

exports.getMyNotice = async (req, res) => {
    const receiver_id = req.user.id;
    try {
        const notices = await noticeRepository.getNotice(receiver_id);
        res.status(200).json({ status: "success", notices });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.readNotice = async (req, res) => {
    const { noticeId } = req.params;
    try {
        noticeRepository.readNotice(noticeId);
        res.status(200).json({ status: "success", message: "Notice marked as read" });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};
