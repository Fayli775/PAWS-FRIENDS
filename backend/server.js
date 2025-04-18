const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


const userRoutes = require("./routes/userRoutes.js");
app.use("/api/users", userRoutes);














app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
