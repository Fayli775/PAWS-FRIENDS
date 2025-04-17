// This file contains the user model which interacts with the database to perform CRUD operations on user data.
// It uses the db.js file for database connection and query execution.
// Importing the database connection from db.js
// The db.js file contains the configuration for connecting to the database.
const db = require("../config/db.js");

//executes a SQL query to fetch a user by their id from the user_info table.
exports.getById = (id) => {
    return db.query(
      "SELECT * FROM user_info WHERE id = ?",
      [id]
    ).then(result => result[0] ? result[0] : null);
  };
  