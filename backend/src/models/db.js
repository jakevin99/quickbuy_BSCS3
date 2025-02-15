"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise")); // Use promise-based MySQL for async queries
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a connection pool (BETTER APPROACH)
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Allows multiple users at the same time
    queueLimit: 0,
});
// Test the database connection
pool
    .getConnection()
    .then((connection) => {
    console.log("Connected to MySQL Database!");
    connection.release(); // Release connection back to pool
})
    .catch((err) => {
    console.error("Database connection failed:", err);
});
exports.default = pool;
