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
    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
    fields.push("gmt_update = NOW()");
    const query = `UPDATE user_info SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);
    const result = await db.query(query, values);
    return result;
  } catch (err) {
    throw new Error("Failed to update user profile: " + err.message);
  }
};


exports.searchSitters = async (filters) => {
  // Destructure filters, providing defaults for pagination
  const { keyword, region, page = 1, limit = 10 } = filters; 
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
    LEFT JOIN booking_review br ON u.id = br.sitter_id
    LEFT JOIN sitter_services ss ON u.id = ss.sitter_id 
    LEFT JOIN availability a ON u.id = a.user_id
    LEFT JOIN services s ON ss.service_id = s.id
  `;
  const whereClauses = [];
  const queryParams = [];


  // Keyword search (in username and bio)
  if (keyword) {
    whereClauses.push('(u.user_name LIKE ? OR u.bio LIKE ? OR s.name LIKE ?)');
    queryParams.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
  }

  // Region filter (exact match on the region column)
  if (region) {
    whereClauses.push('u.region = ?');
    queryParams.push(region);
  }
  
  // TODO: Add filtering for pet_type and service_type once the schema supports storing sitter preferences for these.
  // Currently, pet_type and service_type are only recorded per booking, not per sitter profile.
  query += 'WHERE ss.sitter_id IS NOT NULL AND a.user_id IS NOT NULL';
  // Add WHERE clauses if any exist
  if (whereClauses.length > 0) {
    query += ' AND ' + whereClauses.join(' AND ');
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
    SELECT count(DISTINCT u.id) as cnt
      FROM user_info u
      LEFT JOIN sitter_services ss ON u.id = ss.sitter_id
      LEFT JOIN availability a ON u.id = a.user_id
      LEFT JOIN services s ON ss.service_id = s.id
  `;
  countQuery += 'WHERE ss.sitter_id IS NOT NULL AND a.user_id IS NOT NULL';

   // Add WHERE clauses to count query as well
   if (whereClauses.length > 0) {
    countQuery += ' AND ' + whereClauses.join(' AND ');
  }
  // Use the same params for where clauses, but not pagination params
  const countParams = queryParams.slice(0, queryParams.length - 2); 
  try {
    const [results] = await db.query(query, queryParams);
    const  [countResult] = await db.query(countQuery, countParams);
    const total_count = countResult[0]['cnt'];
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

// Get the user's list of languages
exports.getUserLanguages = async (userId) => {
  const [rows] = await db.query("SELECT language FROM user_languages WHERE user_id = ?", [userId]);
  return rows.map((r) => r.language);
};

exports.addUserLanguages = async (userId, languages) => {
  if (!Array.isArray(languages)) throw new Error("languages must be array");
  await db.query("DELETE FROM user_languages WHERE user_id = ?", [userId]); 
  for (const lang of languages) {
    await db.query("INSERT INTO user_languages (user_id, language) VALUES (?, ?)", [userId, lang]);
  }
};

exports.deleteUserLanguages = async (userId) => {
  await db.query("DELETE FROM user_languages WHERE user_id = ?", [userId]);
};


//add user certificates
exports.addCertificate = async (userId, certificateName) => {
  const query = `
    INSERT INTO user_certificates (user_id, certificate_name)
    VALUES (?, ?)
  `;
  try {
    await db.execute(query, [userId, certificateName]);
  } catch (err) {
    console.error("Error adding certificate to database:", err);
    throw err;
  }
};

exports.getCertificatesByUserId = async (userId) => {
  const query = 'SELECT certificate_name FROM user_certificates WHERE user_id = ?';
  try {
    const results = await db.query(query, [userId]);
    return results.map((row) => row.certificate_name); 
  } catch (err) {
    console.error('Error fetching certificates:', err);
    throw err;
  }
};

// Delete user certificate
exports.deleteCertificate = async (userId, certificateName) => {
  const query = 'DELETE FROM user_certificates WHERE user_id = ? AND certificate_name = ?';
  try {
    await db.query(query, [userId, certificateName]);
  } catch (err) {
    console.error('Error deleting certificate from database:', err);
    throw err;
  }
};


exports.getSitterEmail = async (owner_id) => {
  try {
    const [rows] = await db.query('SELECT email FROM user_info WHERE id = ?', [owner_id]);
    
    if (rows.length === 0) {
      return null;  
    }
    return rows[0].email;  
  } catch (err) {
    console.error("Error fetching sitter email:", err);
    throw err;
  }
};




