const express = require("express");
const cors = require("cors"); // Import cors package
const path = require("path"); // Add path module
require("dotenv").config();
const app = express();

// Enable CORS for all origins (adjust options if needed for production)
app.use(cors());

app.use(express.json());

// Serve static files from the public directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes.js");
app.use("/api/users", userRoutes);

const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);
// get getPetById
const petRoutes = require("./routes/petRoutes.js");
app.use("/api/pets", petRoutes);

const availabilityRoutes = require("./routes/availabilityRoutes");
app.use("/api/availability", availabilityRoutes);

const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api/reviews", reviewRoutes);

const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/services", serviceRoutes);


// Add the new location routes
const locationRoutes = require("./routes/locationRoutes"); // Import location routes
app.use("/api/locations", locationRoutes); // Use location routes

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

