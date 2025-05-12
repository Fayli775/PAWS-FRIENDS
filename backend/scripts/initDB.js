require("../loadEnv");

const fs = require("fs");
const path = require("path");
const db = require("../config/db.js");

async function runSQLFile(filename) {
  const filePath = path.join(__dirname, "..", "sql", filename);
  const sql = fs.readFileSync(filePath, "utf-8");
  const statements = sql.split(/;\s*$/m); 

  for (const statement of statements) {
    if (statement.trim()) {
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
