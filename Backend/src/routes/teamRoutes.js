import express from "express";
import { createTeam, getUserTeams, joinTeam, getTeam, leaveTeam } from "../controllers/teamController.js";
import { protect } from '../middlewares/authMiddleware.js';
import linkRoutes from './linkRoutes.js'; 
import { findAndPostArticles } from '../tasks/botTask.js';

const router = express.Router();

// Nested route: /api/teams/:teamId/links 
router.use('/:teamId/links', linkRoutes);

router.get("/", protect, getUserTeams); 
router.post("/", protect, createTeam);
router.get("/:teamId", protect, getTeam);
router.post("/join", protect, joinTeam);
router.delete("/:teamId/leave", protect, leaveTeam);


router.post('/run-bot-manually', protect, async (req, res) => {
    console.log('NewsBot is triggered manually');
    // We run it but don't wait for it to finish
    findAndPostArticles(); 
    // Immediately send a response so the browser isn't waiting
    res.status(200).json({ message: "NewsBot task triggered successfully." });
});

export default router;