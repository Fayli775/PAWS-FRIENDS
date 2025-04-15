// This file is responsible for creating a connection pool to the MySQL database using the mysql2 library.
const mysql = require("mysql2/promise");
require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// The pool object is exported for use in other parts of the application.
module.exports = pool;
