const fs = require("fs");
const path = require("path");
const db = require("../config/db.js");
async function runSQLFile(filename) {
  const filePath = path.join(__dirname, "..", "sql", filename);
  // console.log('File path:', filePath);
  const sql = fs.readFileSync(filePath, "utf-8");
  console.log("SQL content:", sql);
  const statements = sql.split(/;\s*$/m); // 分割多个 SQL 语句

  for (const statement of statements) {
    if (statement.trim()) {
      console.log("Executing SQL:", statement);
      await db.query(statement);
    }
  }
}
async function initDB() {
  try {
    await runSQLFile("schema.sql");
    await runSQLFile("seed.sql");
    console.log("Database initialized!");
    process.exit(0);
  } catch (err) {
    console.error("Failed to initialize DB:", err);
    process.exit(1);
  }
}

initDB();
//The script initDB.js automates the process of running the schema and seed files to initialize the database.
// It reads the SQL files, splits them into individual statements, and executes each statement sequentially.