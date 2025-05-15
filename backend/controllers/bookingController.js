const Booking = require("../models/bookingModel");
const Notice = require("../models/noticeModel");
const { parseFrontendTimeSlot } = require("../utils/time");
const { getSitterEmail, getUserById } = require("../models/userModel.js");

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

    // Construct standard UTC start and end times
    const { start_time, end_time } = parseFrontendTimeSlot(weekday, time_slot);

// 🛡️ check if the time slot booked
    const isBooked = await Booking.isSlotBooked(sitter_id, start_time, end_time);
    if (isBooked) {
      return res.status(400).json({
        status: "error",
        message: "This time slot has already been booked by someone else.",
      });
    }



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

    // Get owner's email
    const owner_email = await getSitterEmail(owner_id);

    if (!owner_email) {
      return res.status(404).json({ status: "error", message: "Sitter email not found" });
    }

    const bookingId = await Booking.createBooking(bookingData);

    // Send notice to sitter
    await Notice.createNotice(
      sitter_id,
      "New Booking",
      `You have received a new booking. Please check your bookings. You can contact the owner at: ${owner_email}.`
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
    // 1. Fetch booking by id
    const booking = await Booking.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ status: "error", message: "Booking not found" });
    }

    // 2. Fetch owner and sitter data
    const ownerData = await getUserById(booking.owner_id);
    const sitterData = await getUserById(booking.sitter_id);

    // 3. Format start time
    const formattedStartTime = new Date(booking.start_time).toLocaleString();

    // 4. Update booking status
    await Booking.updateBookingStatus(id, status, note);

    // 5. Send notice to owner
    const ownerMessage = `
      Your booking status has been updated to: ${status} <br/>
      <strong>Order Information:</strong> <br/>
      User: ${sitterData.user_name} <br/>
      Sitter: ${ownerData.user_name} <br/>
      Pet Type: ${booking.pet_type} <br/>
      Service Type: ${booking.service_type} <br/>
      Service Time: ${formattedStartTime} <br/>
      ${booking.language ? `Service Language: ${booking.language}` : ''}
    `.trim();
    await Notice.createNotice(booking.owner_id, "Order Status Updated", ownerMessage);

    // 6. Send notice to sitter
    const sitterMessage = `
      Your booking status has been updated to: ${status} <br/>
      <strong>Order Information:</strong> <br/>
      User: ${sitterData.user_name} <br/>
      Sitter: ${ownerData.user_name} <br/>
      Pet Type: ${booking.pet_type} <br/>
      Service Type: ${booking.service_type} <br/>
      Service Time: ${formattedStartTime} <br/>
      ${booking.language ? `Service Language: ${booking.language}` : ''}
    `.trim();
    await Notice.createNotice(booking.sitter_id, "Order Status Updated", sitterMessage);

    res.json({
      status: "success",
      message: `Booking ${id} updated to ${status}`
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
    console.error("Error fetching bookings for user:", err);
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
    console.error("Error fetching bookings for sitter:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

