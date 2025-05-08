// models/certificateModel.js
const db = require("../config/db");
const { toUTCDateTime } = require("../utils/time");

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
  
  
  // userModel.js
  exports.getCertificatesByUserId = async (userId) => {
    const query = 'SELECT certificate_name FROM user_certificates WHERE user_id = ?';
    try {
      const [results] = await db.query(query, [userId]);
      return results; // 返回证书名称数组
    } catch (err) {
      console.error('Error fetching certificates:', err);
      throw err;
    }
  };
  // 删除用户证书
  exports.deleteCertificate = async (userId, certificateName) => {
    const query = 'DELETE FROM user_certificates WHERE user_id = ? AND certificate_name = ?';
    try {
      await db.query(query, [userId, certificateName]);
    } catch (err) {
      console.error('Error deleting certificate from database:', err);
      throw err;
    }
  };
  
  
  
