const db = require("../config/db.js");
exports.getUserById = async (id) => {
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

exports.searchSitters = async (filters) => {
  // Destructure filters, providing defaults for pagination
  const { keyword, region, page = 1, limit = 10 } = filters; // Default to page 1, 10 results per page

  // Validate page and limit
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
    throw new Error("Invalid pagination parameters");
  }
  const offset = (pageNum - 1) * limitNum;

  let query = `
    SELECT
      u.id,
      u.user_name,
      u.bio,
      u.avatar,
      u.region,
      AVG(br.rating) as average_rating,
      COUNT(DISTINCT br.id) as review_count
    FROM user_info u
    LEFT JOIN booking_review br ON u.id = br.sitter_id -- Join with reviews table
    -- WHERE clause will be added dynamically
  `;
  const whereClauses = [];
  const queryParams = [];

  // Keyword search (in username and bio)
  if (keyword) {
    whereClauses.push('(u.user_name LIKE ? OR u.bio LIKE ?)');
    queryParams.push(`%${keyword}%`, `%${keyword}%`);
  }

  // Region filter (exact match on the region column)
  if (region) {
    whereClauses.push('u.region = ?');
    queryParams.push(region);
  }
  
  // TODO: Add filtering for pet_type and service_type once the schema supports storing sitter preferences for these.
  // Currently, pet_type and service_type are only recorded per booking, not per sitter profile.

  // Add WHERE clauses if any exist
  if (whereClauses.length > 0) {
    query += ' WHERE ' + whereClauses.join(' AND ');
  }

  // Group by user to calculate aggregates
  query += ' GROUP BY u.id, u.user_name, u.bio, u.avatar, u.region';

  // Order by average rating (highest first), NULL ratings last
  // query += ' ORDER BY average_rating DESC NULLS LAST, u.id'; // Added secondary sort by id for stable order
  query += ' ORDER BY average_rating DESC, u.id'; // Added secondary sort by id for stable order

  // Add pagination
  query += ' LIMIT ? OFFSET ?';
  queryParams.push(limitNum, offset);


  // Also need a query to count total matching sitters for pagination metadata
  let countQuery = `
    SELECT COUNT(*) as total_count
    FROM (
        SELECT u.id
        FROM user_info u
  `;
   // Add WHERE clauses to count query as well
   if (whereClauses.length > 0) {
    countQuery += ' WHERE ' + whereClauses.join(' AND ');
  }
  // Close the subquery for counting
  countQuery += ' GROUP BY u.id ) AS filtered_users';
  // Use the same params for where clauses, but not pagination params
  const countParams = queryParams.slice(0, queryParams.length - 2); // Exclude limit and offset


  try {
    console.log("Executing SQL (searchSitters - Fetch):", query);
    console.log("With values:", queryParams);
    const [results] = await db.query(query, queryParams);

    console.log("Executing SQL (searchSitters - Count):", countQuery);
    console.log("With values:", countParams);
    const [[{ total_count }]] = await db.query(countQuery, countParams);


    return {
        sitters: results,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total_results: total_count,
            total_pages: Math.ceil(total_count / limitNum)
        }
    };
  } catch (error) {
    console.error("Database query error in searchSitters:", error);
    throw error; // Re-throw the error to be caught by the controller
  }
};

// 获取用户的语言列表

exports.getUserLanguages = async (userId) => {
  const [rows] = await db.query("SELECT language FROM user_languages WHERE user_id = ?", [userId]);
  return rows.map((r) => r.language);
};

exports.addUserLanguages = async (userId, languages) => {
  if (!Array.isArray(languages)) throw new Error("languages must be array");
  await db.query("DELETE FROM user_languages WHERE user_id = ?", [userId]); // 清空后插入
  for (const lang of languages) {
    await db.query("INSERT INTO user_languages (user_id, language) VALUES (?, ?)", [userId, lang]);
  }
};

exports.deleteUserLanguages = async (userId) => {
  await db.query("DELETE FROM user_languages WHERE user_id = ?", [userId]);
};
