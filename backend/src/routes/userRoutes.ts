import express from "express";
import { registerUser, logoutUser } from "../controllers/userController";

const router = express.Router();

// POST /api/register will use the registerUser contrller

router.post("/register", registerUser);
router.post("/logout", logoutUser);

export default router;
