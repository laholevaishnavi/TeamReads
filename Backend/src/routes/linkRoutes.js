
import express from "express";
import { addLink, getLinks, deleteLink } from "../controllers/linkController.js";
import { protect } from '../middlewares/authMiddleware.js';

// He router 'mergeParams: true' sobat banva
// jeणेकरून te parent route (teamId) cha parameter access karu shakel
const router = express.Router({ mergeParams: true });

// Eka specific team che sagale links 
// GET /api/teams/team123/links
router.get("/", protect, getLinks);

// Eka specific team madhe navin link add karne
// POST /api/teams/team123/links
router.post("/", protect, addLink);

// Eka specific link la delete karne
// DELETE /api/links/link456
router.delete("/:linkId", protect, deleteLink); // Ha route veglya file madhe thevla tari chalel

export default router;