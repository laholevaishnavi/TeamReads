import express from "express";
import { addLink, getLinks } from "../controllers/linkController.js";
import { protect } from '../middlewares/authMiddleware.js';

// This router correctly merges params to get the teamId from its parent route
const router = express.Router({ mergeParams: true });

// GET /api/teams/:teamId/links
router.get("/", protect, getLinks);

// POST /api/teams/:teamId/links
router.post("/", protect, addLink);

// We have removed the delete route from this file.

export default router;