const db = require("../config/db.js");
exports.getById = (id) => {
    return db.query(
      "SELECT * FROM user_info WHERE id = ?",
      [id]
    ).then(result => result[0] ? result[0] : null);
  };
  