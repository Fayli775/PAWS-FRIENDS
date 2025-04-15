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
const userRouters = require("./routes/userRoutes.js");
app.use("/api/dogs", dogRoutes); 
app.use("/api/users", userRouters);

//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});



// start the server
const port = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${port}`);
});
