const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//root route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Load dog routes
const dogRoutes = require("./routes/dogs");
app.use("/api/dogs", dogRoutes); 



//!
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
