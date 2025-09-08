import express from "express";
import { createTeam, getUserTeams, joinTeam, getTeam, leaveTeam } from "../controllers/teamController.js";
import { protect } from '../middlewares/authMiddleware.js';
import linkRoutes from './linkRoutes.js'; // Nested routes sathi import kara

const router = express.Router();

// Nested route: /api/teams/:teamId/links sathi linkRoutes la redirect kara
router.use('/:teamId/links', linkRoutes);

router.get("/", protect, getUserTeams); 
router.post("/", protect, createTeam);
router.get("/:teamId", protect, getTeam);
router.post("/join", protect, joinTeam);
router.delete("/:teamId/leave", protect, leaveTeam);

export default router;