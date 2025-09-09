
import express from "express";
import { addLink, getLinks, deleteLink } from "../controllers/linkController.js";
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router({ mergeParams: true });

// for all links of a specific team
// GET /api/teams/team123/links
router.get("/", protect, getLinks);

// for adding new links in a specific team
// POST /api/teams/team123/links
router.post("/", protect, addLink);

//for deleting a specifi link
// DELETE /api/links/link456
router.delete("/:linkId", protect, deleteLink); 

export default router;