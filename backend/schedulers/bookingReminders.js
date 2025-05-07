// schedulers/bookingReminder.js
const { createNotice } = require("../models/noticeModel");
const db = require("../config/db");
const { toUTCDateTime } = require("../utils/time");

const sendBookingReminders = async () => {
    const [bookings] = await db.query(`
        SELECT id, owner_id, sitter_id, start_time
        FROM booking
        WHERE status NOT IN ('cancelled', 'completed')
        AND start_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 30 MINUTE)
    `);

    for (const booking of bookings) {
        const { owner_id, sitter_id, start_time } = booking;

        const title = "Booking Reminder";
        const timeText = toUTCDateTime(start_time);
        const message = `Reminder: your booking will start at ${timeText}.`;

        await createNotice(owner_id, title, message, "reminder");
        await createNotice(sitter_id, title, message, "reminder");
    }
};

module.exports = { sendBookingReminders };
