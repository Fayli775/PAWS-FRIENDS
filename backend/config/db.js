// This file is responsible for creating a connection pool to the MySQL database using the mysql2 library.
const mysql = require("mysql2/promise");
require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,      // 默认值
  queueLimit: 0,            // 无限制排队
  idleTimeout: 60000,       // 空闲连接超时（毫秒）
  enableKeepAlive: true,     // 保持连接活跃
  keepAliveInitialDelay: 0,
});
// The pool object is exported for use in other parts of the application.
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully!");
    connection.release();  // 释放连接回池中
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

// 在应用启动时测试数据库连接
testConnection();


module.exports = pool;
