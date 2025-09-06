// import express from "express";
// import { addLink, getLinks } from "../controllers/linkController.js";
// const router = express.Router();

// router.post("/scrap", addLink);
// router.get("/:teamId", getLinks);

// export default router;
import express from "express";
import { addLink, getLinks } from "../controllers/linkController.js";

const router = express.Router();

// POST /links
router.post("/links", addLink);

// GET /links/:teamId
router.get("/links/:teamId", getLinks);

export default router;
