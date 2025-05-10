const Booking = require("../models/bookingModel");
const Notice = require("../models/noticeModel");
const { parseFrontendTimeSlot } = require("../utils/time");
// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      owner_id,
      sitter_id,
      pet_type,
      pet_id,
      service_type,
      weekday,
      time_slot,
      language,
    } = req.body;

    //  Construct standard UTC start and end times
    const { start_time, end_time } = parseFrontendTimeSlot(weekday, time_slot);

    // Construct a booking object and pass it to the model
    const bookingData = {
      owner_id,
      sitter_id,
      pet_type,
      pet_id,
      service_type,
      start_time,
      end_time,
      language,
    };

    const bookingId = await Booking.createBooking(bookingData);
    Notice.createNotice(
      sitter_id,
      "new booking",
      "You have received a new booking. Please check your bookings."
    );
    res.status(201).json({ status: "success", bookingId });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Update the status of a booking: accept, reject, or complete
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;

  try {
    await Booking.updateBookingStatus(id, status, note);
    Notice.createNotice(
      id,
      "booking status change",
      `Your booking status has been updated to ${status}.`
    );
    res.json({
      status: "success",
      message: `Booking ${id} updated to ${status}`,
    });
  } catch (err) {
    console.error("Error updating booking status:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get all bookings for a specific user
exports.getBookingsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.getBookingsByUser(userId);
    res.json({ status: "success", bookings });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get all bookings for a specific sitter
exports.getBookingsBySitter = async (req, res) => {
  const { sitterId } = req.params;

  try {
    const bookings = await Booking.getBookingsBySitter(sitterId);
    res.json({ status: "success", bookings });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
