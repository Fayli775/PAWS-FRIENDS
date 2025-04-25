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

//const path = require("path");
exports.uploadAvatar = (id, filePath) => {
  const avatarUrl = filePath; // Assuming filePath is the URL or path to the uploaded file
  return db
    .query("UPDATE user_info SET avatar = ? WHERE id = ?", [avatarUrl, id])
    .then(() => {
      return {
        status: "success",
        message: "Avatar updated successfully",
        avatarUrl,
      };
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
      throw new Error("Failed to update avatar");
    });
};


// Update user profile including avatar

exports.updateUserProfile = async (id, data) => {
  try {
    const fields = [];
    const values = [];

    // 动态生成 SQL 字段和参数
    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    // 添加更新时间字段
    fields.push("gmt_update = NOW()");

    // 拼接 SQL 查询
    const query = `UPDATE user_info SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    console.log("Executing SQL (updateUserProfile):", query);
    console.log("With values:", values);

    const result = await db.query(query, values);
    return result;
  } catch (err) {
    throw new Error("Failed to update user profile: " + err.message);
  }
};