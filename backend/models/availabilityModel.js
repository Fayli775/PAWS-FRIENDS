// models/availabilityModel.js
const db = require("../config/db");
// const { toUTCTimeOnly } = require("../utils/time"); ❌ 不再需要

exports.setAvailability = async (user_id, slots) => {
  // 先删除该用户旧的可预约时间
  await db.query("DELETE FROM availability WHERE user_id = ?", [user_id]);

  // 直接存储用户选择的本地时间（不再转 UTC）
  const values = slots.map(slot => [
    user_id,
    slot.weekday,
    slot.start_time,  // ✅ 不转换
    slot.end_time     // ✅ 不转换
  ]);

  await db.query(
    "INSERT INTO availability (user_id, weekday, start_time, end_time) VALUES ?",
    [values]
  );
};

exports.getAvailabilityByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT weekday, start_time, end_time
     FROM availability
     WHERE user_id = ?
     ORDER BY FIELD(weekday, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), start_time`,
    [user_id]
  );
  return rows;
};
