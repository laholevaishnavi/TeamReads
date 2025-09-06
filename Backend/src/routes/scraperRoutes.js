
import express from "express";
import { addLink } from "../controllers/linkController.js";

const router = express.Router();

router.post("/scrape", addLink);

export default router;
