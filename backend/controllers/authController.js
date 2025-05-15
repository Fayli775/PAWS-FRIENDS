const bcrypt = require("bcrypt");
const auth = require("../models/authModel");
exports.register = async (req, res) => {
  const { email, password, user_name, bio, region } = req.body;
  if (!email || !password || !user_name) {
    return res
      .status(400)
      .json({ message: "Email, password, and username are required" });
  }
  try {
    const existing = await auth.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // const avatar = req.file ? req.file.filename : null; 
    const avatar = req.fileUrlToStore ? req.fileUrlToStore : null;


    const userId = await auth.createUser({
      email,
      password: hashedPassword,
      user_name,
      bio,
      region,
      avatar,
    });

    res.status(201).json({
      status: "success",
      user: {
        id: userId,
        email,
        user_name,
        avatar: avatar ? `/images/uploads/avatars/${avatar}` : null,
      },
    });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// Check if email exists
exports.checkEmailExists = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existing = await auth.findUserByEmail(email);
    res.status(200).json({ isUnique: !existing }); // true if exists
  } catch (err) {
    console.error("Error in checkEmailExists:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await auth.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    //  token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    // Login successful
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        user_name: user.user_name,
        avatar: user.avatar ? `/images/uploads/avatars/${user.avatar}` : null,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
