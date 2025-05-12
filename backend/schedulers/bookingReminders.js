const { createNotice } = require("../models/noticeModel");
const db = require("../config/db");

const toNZTime = (start_time) => {
  const date = new Date(start_time);
  date.setHours(date.getHours() + 12);

  return date.toISOString().slice(0, 19).replace("T", " ");
};

// Used to store sent reminders to prevent duplicate sending
const sentReminders = new Map();
const sendBookingReminders = async () => {
  const currentTime = new Date();
  const NZTime = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  // Retrieve all active bookings scheduled within the next 30 minutes
  const [bookings] = await db.query(
    `
       SELECT id, owner_id, sitter_id, start_time
        FROM booking
        WHERE status NOT IN ('cancelled', 'completed')
        AND start_time BETWEEN ? AND DATE_ADD(?, INTERVAL 30 MINUTE)
    `,
    [NZTime, NZTime]
  );

  for (const booking of bookings) {
    const { id, owner_id, sitter_id, start_time } = booking;

    // Check whether a reminder has already been sent for this booking
    if (sentReminders.has(id)) {
      console.log(`Reminder already sent for booking ID: ${id}`);
      continue;
    }

    const title = "Booking Reminder";
    const timeText = toNZTime(start_time);
    const message = `Reminder: your booking will start at ${timeText}.`;
    await createNotice(owner_id, title, message, "reminder");
    await createNotice(sitter_id, title, message, "reminder");
    sentReminders.set(id, true);
  }
};

module.exports = { sendBookingReminders };
