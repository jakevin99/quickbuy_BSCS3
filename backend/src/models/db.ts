import mysql from "mysql2/promise"; // Use promise-based MySQL for async queries
import dotenv from "dotenv";

dotenv.config();

// Create a connection pool (BETTER APPROACH)
const pool = mysql.createPool({
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

export default pool;
