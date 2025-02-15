// The purpose of This User Controller, is to Validate the inputs that the user register.
import { RowDataPacket } from "mysql2/promise";
import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import pool from "../models/db";

// User Interface
interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

// Registration Controller
export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username, email, password, role } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password || !role) {
    res.status(400).json({ message: "All fields are required!" });
    return;
  }

  // Basic email validation using REgular Epresison
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Invalid email format" });
    return;
  }

  // check For a strong password ( Minimum 8 characters)
  if (password.length < 8) {
    res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  try {
    // Check if the email or username already exists
    const [rows] = await pool.query<RowDataPacket[] & User[]>(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (rows.length > 0) {
      res.status(400).json({ message: "Email or username already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const query =
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    await pool.query(query, [username, email, hashedPassword, role]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
