const dayjs = require("dayjs");

// Format as "YYYY-MM-DD HH:mm:ss" (local time)
const toLocalDateTime = (input = new Date()) => {
  return dayjs(input).format("YYYY-MM-DD HH:mm:ss");
};

// Extract only the time portion "HH:mm:ss" (used for availability start_time / end_time)
const toTimeOnly = (input) => {
  const fakeDateTime = `2000-01-01T${input}`;
  return dayjs(fakeDateTime).format("HH:mm:ss");
};

// Given a weekday and timeSlot, calculate the nearest upcoming full start and end time (local time)
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
    toUTCDateTime: toLocalDateTime, 
    toTimeOnly,
    parseFrontendTimeSlot
  };