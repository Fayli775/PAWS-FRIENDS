
const db = require("../config/db.js");
exports.getUserById = (id) => {
  return db
    .query("SELECT * FROM user_info WHERE id = ?", [id])
    .then((result) => {
      const rows = result[0]; 
      if (rows.length === 0) {
        return null; 
      }
      return rows[0];
    })
    .catch((error) => {
      console.error("Database query error:", error);
      throw error;
    });
};

exports.updatePassword = async (id, hashedPassword) => {
  try {
    const result = await db.query(
      "UPDATE user_info SET password = ?, gmt_update = NOW() WHERE id = ?",
      [hashedPassword, id]
    );
    return result; 
  } catch (err) {
    throw new Error("Failed to update password: " + err.message);
  }
};

// Middleware(用于 router)
const path = require("path");
exports.uploadAvatar = (id, filePath) => {
  const avatarUrl = `/images/${path.basename(filePath)}`;

  return db
    .query("UPDATE user_info SET avatar = ? WHERE id = ?", [avatarUrl, id])
    .then(() => {
      return { status: "success", message: "Avatar updated successfully", avatarUrl };
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
      throw new Error("Failed to update avatar");
    });
};



exports.updateUserProfile = async (id, { user_name, bio, region, phone_number, emergency_contact }) => {
  try {
    const result = await db.query(
      `UPDATE user_info 
       SET user_name = ?, bio = ?, region = ?, phone_number = ?, emergency_contact = ?, gmt_update = NOW()
       WHERE id = ?`,
      [user_name, bio, region, phone_number, emergency_contact, id]
    );
    return result;
  } catch (err) {
    throw new Error('Failed to update user profile: ' + err.message);
  }
};

