import express from "express";
import { signup, login, logout, checkStatus } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Base Path: /api/auth
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout); 
router.get("/status", protect, checkStatus);

export default router;