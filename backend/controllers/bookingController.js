const Booking = require("../models/bookingModel");
const Notice = require("../models/noticeModel");
const { parseFrontendTimeSlot } = require("../utils/time");
const {getSitterEmail, getUserById} = require ("../models/userModel.js");
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
   // get owner's email
    const owner_email = await getSitterEmail(owner_id);  // use getSitterEmail to get email

    if (!owner_email) {
      return res.status(404).json({ status: "error", message: "Sitter email not found" });
    }
    const bookingId = await Booking.createBooking(bookingData);
    Notice.createNotice(
      sitter_id,
      "new booking",
      `You have received a new booking. Please check your bookings. You can contact the owner at: ${owner_email}.`
    );
    res.status(201).json({ status: "success", bookingId });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Update the status of a booking: accept, reject, or complete
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;

  try {
    // 1. fetch booking by id
    const booking = await Booking.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ status: "error", message: "Booking not found" });
    }

    // 2. fetch owner and sitter data
    const ownerData = await getUserById(booking.owner_id);
    const sitterData = await getUserById(booking.sitter_id);
    
    // 3. format start time
    const formattedStartTime = new Date(booking.start_time).toLocaleString();
    
    // 4. update booking status
    await Booking.updateBookingStatus(id, status, note);
    
    // 5. construct detailed notice message
    const formattedMessage = `
      Your booking status has been updated to: ${status}
      <strong>Order Information:</strong>
      Pet type: ${booking.pet_type}
      Service Type: ${booking.service_type}
      Service Time: ${formattedStartTime}
    `;
    
    // 6. send notice to owner
    const ownerMessage = `
      ${sitterData.user_name} has updated your booking status to: ${status} <br/>
      <strong>Order Information:</strong> <br/>
      Pet Type: ${booking.pet_type} <br/>
      Service Type: ${booking.service_type} <br/>
      Service Time: ${formattedStartTime} <br/>
      ${booking.language ? `Service Language: ${booking.language}<br/>` : ''}
    `.trim();
    Notice.createNotice(booking.owner_id, "Order Status Updated", ownerMessage);
    
    // 7. send notice to sitter
    const sitterMessage = `
      ${ownerData.user_name} 's booking status has been updated to: ${status} <br/>
      <strong>Order Information:</strong> <br/>
      Pet Type: ${booking.pet_type} <br/>
      Service Type: ${booking.service_type} <br/>
      Service Time: ${formattedStartTime} <br/>
      ${booking.language ? `Service Language: ${booking.language}` : ''} <br/>
    `;
    Notice.createNotice(booking.sitter_id, "Order Status Updated", sitterMessage);

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
