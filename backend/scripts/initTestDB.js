// scripts/initTestDB.js
require("../loadEnv");

const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});

const initDB = async () => {
    const dbName = process.env.DB_NAME;

    if (dbName !== "paws_friends_test") {
        console.error(`ABORTED: DB_NAME is not 'paws_friends_test' (received: ${dbName})`);
        process.exit(1);
    }

    const sqlPath = path.join(__dirname, "../sql/init_test_db.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    try {
        const connection = await pool.getConnection();
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await connection.query(`USE \`${dbName}\`;`);
        await connection.query(sql);
        console.log("Test database initialized successfully!");
        connection.release();
    } catch (err) {
        console.error("Failed to initialize test database:", err);
    } finally {
        await pool.end();
    }
};

initDB();
