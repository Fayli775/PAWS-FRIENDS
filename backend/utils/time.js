// utils/time.js
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

// ⏰ 转为 UTC 的完整日期时间（YYYY-MM-DD HH:mm:ss）
exports.toUTCDateTime = (input = new Date()) => {
    return dayjs(input).utc().format("YYYY-MM-DD HH:mm:ss");
};

// 🕐 转为 UTC 的时间字符串（HH:mm:ss）——用于 availability
exports.toUTCTimeOnly = (input) => {
    const fakeDateTime = `2000-01-01T${input}`;
    return dayjs(fakeDateTime).utc().format("HH:mm:ss");
};

// 🗓️ 用于将前端传入的 weekday + time_slot 拼成完整 UTC 起止时间
exports.parseFrontendTimeSlot = (weekdayLabel, timeSlot) => {
    const weekdayMap = {
        Sun: 0, Mon: 1, Tue: 2, Wed: 3,
        Thu: 4, Fri: 5, Sat: 6
    };

    const today = dayjs();
    const targetDay = weekdayMap[weekdayLabel];
    const baseDate = today.day() <= targetDay
        ? today.day(targetDay)
        : today.add(1, "week").day(targetDay);
    
    const [startRaw, endRaw] = timeSlot.split(/[–-]/).map(s => s.trim());

    const start_time = dayjs(`${baseDate.format("YYYY-MM-DD")} ${startRaw}`)
        .utc()
        .format("YYYY-MM-DD HH:mm:ss");

    const end_time = dayjs(`${baseDate.format("YYYY-MM-DD")} ${endRaw}`)
        .utc()
        .format("YYYY-MM-DD HH:mm:ss");

    return { start_time, end_time };
};
