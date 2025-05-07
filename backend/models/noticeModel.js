// models/noticeModel.js
const db = require("../config/db");
const { toUTCDateTime } = require("../utils/time");

// 查看用户的所有消息
exports.getNotice = async (receiver_id) => {
    const[rows] = await db.query(
        `SELECT id, receiver_id, title, message, read_tag, created_at FROM notice_info
         WHERE receiver_id = ? ORDER BY created_at DESC`,
        [receiver_id]
    );
    return rows;
};


// 标记消息为已读
exports.readNotice = async (notice_id) => {
    await db.execute(
        `UPDATE notice_info set read_tag=1 WHERE id = ?`,
        [notice_id]
    );
};

// 创建新消息
exports.createNotice = async (receiver_id, title, message) => {
    await db.execute(
        `INSERT INTO notice_info (receiver_id, title, message, read_tag) VALUES (?, ?, ?, ?)`,
        [receiver_id, title, message, 0]
    );
}
