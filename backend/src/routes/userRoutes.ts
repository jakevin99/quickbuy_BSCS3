import express from "express";
import { registerUser } from "../controllers/userController";

const router = express.Router();

// POST /api/register will use the registerUser contrller

router.post("/register", registerUser);

export default router;
