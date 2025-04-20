import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile
} from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { validateRegistration, validateLogin } from "../utils/validation";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

// Auth routes
router.post("/register", validateRegistration, asyncHandler(registerUser));
router.post("/login", validateLogin, asyncHandler(loginUser));
router.post("/logout", authenticateToken, logoutUser);

// User profile routes
router.get("/profile", authenticateToken, asyncHandler(getUserProfile));

export default router;
