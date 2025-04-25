//authController.js
const db = require("../config/db.js");

exports.findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM user_info WHERE LOWER(email) = LOWER(?)",
    [email]
  );
  return rows[0];
};

exports.createUser = async (userData) => {
  const { user_name, email, password, bio, region, avatar } = userData;
  const [result] = await db.query(
    "INSERT INTO user_info (user_name, email, password, bio, region, avatar) VALUES (?, ?, ?, ?, ?, ?)",
    [user_name, email, password, bio, region, avatar]
  );

  return result.insertId;
};
