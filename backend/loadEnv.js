// backend/loadEnv.js
const dotenv = require("dotenv");
const path = require("path");

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
const envPath = path.join(__dirname, envFile);

dotenv.config({ path: envPath });
