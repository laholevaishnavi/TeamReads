// import express from "express";
// import { createTeam, joinTeam, getTeam } from "../controllers/teamController.js";
// const router = express.Router();

// router.post("/create", createTeam);
// router.post("/join", joinTeam);
// router.get("/:id", getTeam);
// router.get('/user/:userId', getUserTeams);

// export default router;
// routes/teamRoutes.js


import express from "express";
import { createTeam, getUserTeams, joinTeam, getTeam } from "../controllers/teamController.js";

const router = express.Router();

router.post("/teams", createTeam);             // create
router.get("/teams/user/:userId", getUserTeams); //  user teams
router.post("/teams/join", joinTeam);          // join
router.get("/teams/:id", getTeam);             // get single team

export default router;
