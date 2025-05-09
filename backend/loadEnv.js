// backend/loadEnv.js
const dotenv = require("dotenv");
const path = require("path");

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
const envPath = path.join(__dirname, envFile);

dotenv.config({ path: envPath });

console.log("🌱 loadEnv: NODE_ENV =", process.env.NODE_ENV);//test没问题后需要删除
console.log("🔥 loadEnv: DB_NAME =", process.env.DB_NAME);//test没问题后需要删除
