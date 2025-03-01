import express from "express";
import { getAllUsers, deleteUser } from "../controllers/adminController";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

    router.get("/users", getAllUsers);
    router.delete("/deleteuser/:id", deleteUser);

// middleware protected admin routes.
// router.get("/users", authenticateToken, isAdmin, getAllUsers);
// router.delete("/deleteuser/:id", authenticateToken, isAdmin, deleteUser);

export default router;
