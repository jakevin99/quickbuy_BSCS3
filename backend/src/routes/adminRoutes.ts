import express from "express";
import { getAllUsers, deleteUser } from "../controllers/adminController";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

// Apply middleware to all admin routes
router.use(authenticateToken, isAdmin);

// Users management
router.get("/users", asyncHandler(getAllUsers));
router.delete("/users/:id", asyncHandler(deleteUser));

export default router;
