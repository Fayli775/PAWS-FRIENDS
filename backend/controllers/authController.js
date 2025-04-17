const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

exports.register = async (req, res) => {
  const { username, email, password, bio, region } = req.body;

  try {
    const existing = await Auth.findUserByUsername(username);
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await Auth.createUser({ username, email, password: hashedPassword, bio, region });

    res.status(201).json({ status: "success", userId });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Auth.findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ status: "success", token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
