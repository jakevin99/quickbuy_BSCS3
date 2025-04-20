import { Request, Response, NextFunction } from "express";
import { Session } from "express-session";
import * as userService from '../services/userService';
import { ApiError } from '../middlewares/errorMiddleware';
import { sendSuccess } from '../utils/responseHandler';

interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: string;
  shop_name: string;
}

interface RequestWithSession extends Request {
  session: Session & {
    userId?: number;
    role?: string;
    destroy(callback: (error: Error | null) => void): void;
  };
}

interface AuthRequest extends Request {
  user?: { userId: number; role: string };
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role, shop_name } = req.body;

  // Check if user already exists
  const existingUsers = await userService.checkExistingUser(email, username, role === "seller" ? shop_name : undefined);
  
  if (existingUsers.email) {
    throw new ApiError(400, "Email already exists");
  }
  
  if (existingUsers.username) {
    throw new ApiError(400, "Username already exists");
  }
  
  if (role === "seller" && existingUsers.shop_name) {
    throw new ApiError(400, "Shop name already exists");
  }

  // Create user
  await userService.createUser({
    username,
    email,
    password,
    role,
    shop_name
  });

  sendSuccess(res, null, "User registered successfully", 201);
};

// @desc    Login user and get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await userService.findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isValidPassword = await userService.validatePassword(password, user.password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = userService.generateAuthToken(user.id, user.role);

  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  };

  sendSuccess(res, { user: userData, token }, "Logged in successfully");
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = (req: RequestWithSession, res: Response, next: NextFunction): void => {
  req.session.destroy((error: Error | null) => {
    if (error) {
      next(new ApiError(500, "Could not log out, please try again"));
      return;
    }
    res.clearCookie("connect.sid");
    sendSuccess(res, null, "Logged out successfully");
  });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    throw new ApiError(401, "Not authenticated");
  }

  const userProfile = await userService.getUserProfile(req.user.userId);
  
  if (!userProfile) {
    throw new ApiError(404, "User not found");
  }
  
  sendSuccess(res, userProfile, "User profile retrieved successfully");
};
