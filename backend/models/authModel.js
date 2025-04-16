const db = require("../config/db.js");

exports.findUserByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM user_info WHERE username = ?", [username]);
  return rows[0];
};

exports.createUser = async (userData) => {
  const { username, email, password, bio, region } = userData;
  const [result] = await db.query(
    "INSERT INTO user_info (username, email, password, bio, region) VALUES (?, ?, ?, ?, ?)",
    [username, email, password, bio, region]
  );
  return result.insertId;
};
