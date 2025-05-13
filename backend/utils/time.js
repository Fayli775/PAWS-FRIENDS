const dayjs = require("dayjs");

// 1️⃣ 格式化成“YYYY-MM-DD HH:mm:ss”（本地时间）
const toLocalDateTime = (input = new Date()) => {
  return dayjs(input).format("YYYY-MM-DD HH:mm:ss");
};

// 2️⃣ 只提取时间部分 “HH:mm:ss”（用于 availability 的 start_time / end_time）
const toTimeOnly = (input) => {
  const fakeDateTime = `2000-01-01T${input}`;
  return dayjs(fakeDateTime).format("HH:mm:ss");
};

// 3️⃣ 从 weekday 和 timeSlot 推算出最近日期的完整起止时间（本地时间）
const parseFrontendTimeSlot = (weekdayLabel, timeSlot) => {
  const weekdayMap = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3,
    Thu: 4, Fri: 5, Sat: 6
  };

  const today = dayjs();
  const todayDay = today.day();
  const targetDay = weekdayMap[weekdayLabel];

  const offset = (targetDay - todayDay + 7) % 7;
  const baseDate = today.add(offset, "day").format("YYYY-MM-DD");

  const [startRaw, endRaw] = timeSlot.split(/[–-]/).map(s => s.trim());

  const start_time = dayjs(`${baseDate} ${startRaw}`).format("YYYY-MM-DD HH:mm:ss");
  const end_time = dayjs(`${baseDate} ${endRaw}`).format("YYYY-MM-DD HH:mm:ss");

  return { start_time, end_time };
};

module.exports = {
    toLocalDateTime,
    toUTCDateTime: toLocalDateTime, // ✅ 兼容旧代码的名字
    toTimeOnly,
    parseFrontendTimeSlot
  };