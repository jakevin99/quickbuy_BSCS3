import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../middlewares/errorMiddleware';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateRole = (role: string): boolean => {
  return role === 'customer' || role === 'seller' || role === 'admin';
};

export const validateRegistration = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const { username, email, password, role, shop_name } = req.body;

  // Check required fields
  if (!username || !email || !password || !role) {
    throw new ApiError(400, "All fields are required!");
  }

  // Validate role
  if (!validateRole(role)) {
    throw new ApiError(400, "Invalid role selected");
  }

  // Validate seller data
  if (role === "seller" && (!shop_name || shop_name.trim() === "")) {
    throw new ApiError(400, "Shop name is required for sellers");
  }

  // Validate email
  if (!validateEmail(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  // Validate password
  if (!validatePassword(password)) {
    throw new ApiError(400, "Password must be at least 8 characters long");
  }

  next();
};

export const validateLogin = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  next();
}; 