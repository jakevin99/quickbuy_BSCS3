// The purpose of This User Controller, is to Validate the inputs that the user register.
import { RowDataPacket } from "mysql2/promise";
import { Request, Response } from "express";
import { Session } from 'express-session';
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

// Extend Request type to include session
interface RequestWithSession extends Request {
  session: Session & {
    userId?: number;
    role?: string;
    destroy(callback: (error: Error | null) => void): void;
  };
}

// Registration Controller
export const registerUser = async (
  req: Request,
  res: Response
) => {
  const { username, email, password, role } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password || !role) {
    res.status(400).json({ message: "All fields are required!" });
    return;
  }

  // Validate role (only allow customer or seller)
  if (role !== 'customer' && role !== 'seller') {
    res.status(400).json({ message: "Invalid role selected" });
    return;
  }

  // Basic email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Invalid email format" });
    return;
  }

  // Check for password strength
  if (password.length < 8) {
    res.status(400).json({ message: "Password must be at least 8 characters long" });
    return;
  }

  try {
    // Check if email or username exists
    const [rows] = await pool.query<RowDataPacket[] & User[]>(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (rows.length > 0) {
      res.status(400).json({ message: "Email or username already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const query = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    await pool.query(query, [username, email, hashedPassword, role]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
export const loginUser = async (
  req: RequestWithSession,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const [rows] = await pool.query<RowDataPacket[] & User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const user = rows[0];

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Set session data
    req.session.userId = user.id;
    req.session.role = user.role;
    
    // Save session
    req.session.save((err) => {
      if (err) {
        res.status(500).json({ message: "Error creating session" });
        return;
      }
      
      res.json({
        message: "Logged in successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Logout Controller
export const logoutUser = (
  req: RequestWithSession,
  res: Response
) => {
  try {
    req.session.destroy((error: Error | null) => {
      if (error) {
        res.status(500).json({ message: "Could not log out, please try again" });
        return;
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};
