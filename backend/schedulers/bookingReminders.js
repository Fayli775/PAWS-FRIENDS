// schedulers/bookingReminder.js
const { createNotice } = require("../models/noticeModel");
const db = require("../config/db");
const { toUTCDateTime } = require("../utils/time");

// 将 UTC 时间转换为新西兰时间（UTC+12）
const toNZTime = (start_time) => {
  const date = new Date(start_time);
  date.setHours(date.getHours() + 12); // 将 UTC 转换为 NZT
  return date.toISOString().slice(0, 19).replace("T", " ");
};

// 用于存储已发送的提醒，防止重复发送
const sentReminders = new Map();

const sendBookingReminders = async () => {
  // 获取当前时间并转换为新西兰时间（UTC+12）
  const currentTime = new Date();
  const NZTime = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " "); // 获取当前时间并转为符合SQL格式的字符串（新西兰时间）

  // 查询在当前时间30分钟内的所有有效预约
  const [bookings] = await db.query(
    `
        SELECT id, owner_id, sitter_id, start_time
        FROM booking
        WHERE status NOT IN ('cancelled', 'completed')
        AND start_time BETWEEN ? AND DATE_ADD(?, INTERVAL 30 MINUTE)
    `,
    [NZTime, NZTime]
  ); // 使用新西兰时间进行查询

  for (const booking of bookings) {
    const { id, owner_id, sitter_id, start_time } = booking; // 解构获取 id

    // 检查该预约的提醒是否已经发送
    if (sentReminders.has(id)) {
      console.log(`Reminder already sent for booking ID: ${id}`);
      continue; // 如果已发送，跳过
    }

    const title = "Booking Reminder";
    // 转换 start_time 为新西兰时间
    const timeText = toNZTime(start_time); // 假设 start_time 存储为 UTC 时间，转换为新西兰时间
    const message = `Reminder: your booking will start at ${timeText}.`;

    // 创建提醒通知
    await createNotice(owner_id, title, message, "reminder");
    await createNotice(sitter_id, title, message, "reminder");
    // 记录已发送的提醒
    sentReminders.set(id, true);
  }
};

module.exports = { sendBookingReminders };
