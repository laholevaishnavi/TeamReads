import Team from "../models/Team.js";
import { nanoid } from "nanoid";
import mongoose from "mongoose";



export const createTeam = async (req, res) => {
  try {
    // FIX: userId la req.user madhun ghya, req.body madhun nahi
    const { name } = req.body;
    const userId = req.user.id; // Ha barobar मार्ग (correct way) ahe

    // Check karuya ki userId milala ka
    if (!userId) {
      return res.status(400).json({ message: "User not identified. Please login again." });
    }

    // Tumcha unique code generation cha logic khup changla ahe!
    let code;
    let teamExists = true;
    while (teamExists) {
      // nanoid vaparnyasathi import kelele pahije
      // import { nanoid } from "nanoid";
      code = Math.random().toString(36).substring(2, 8).toUpperCase(); 
      teamExists = await Team.findOne({ code });
    }

    // Ata userId undefined nasnar, mhanun members array madhe add hoil
    const team = new Team({
      name,
      code,
      members: [userId]
    });
    await team.save();

    // Response madhe member chi mahiti pan pathvuya
    const populatedTeam = await Team.findById(team._id).populate({
      path: "members",
      select: "firstName lastName email"
    });

    res.status(201).json(populatedTeam);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserTeams = async (req, res) => {
  try {
    console.log("--- 🕵️ Controller Function Started 🕵️ ---");

    // Apan purna req.user object check karu ki to aala ahe ka
    console.log("User object available in controller:", req.user);

    // He ek extra check ahe, problem shodnyasathi
    if (!req.user || !req.user.id) {
      console.log("❌ CRITICAL: req.user kiva req.user.id controller madhe milala nahi!");
      // Ha error pathvun apan kalvu ki nehmka problem kay ahe
      return res.status(500).json({ error: "User information could not be processed." });
    }

    const userId = req.user.id;
    console.log("Searching for teams for final User ID:", userId);

    const teams = await Team.find({ members: userId });
    console.log("Found this many teams:", teams.length);

    res.status(200).json(teams);
    
  } catch (err) {
    console.error("Error inside getUserTeams:", err);
    res.status(500).json({ error: "Something went wrong in the controller." });
  }
};

export const joinTeam = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;

    if (!code || !userId) {
      return res.status(400).json({ message: "Team code and userId are required." });
    }
    const team = await Team.findOne({ code });

    if (!team) return res.status(404).json({ message: "Team not found" });

    // आधीच member नसेल तर add कर
    if (!team.members.includes(userId)) {
      team.members.push(new mongoose.Types.ObjectId(userId));
      await team.save();
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getTeam = async (req, res) => {
  try {
    const { teamId  } = req.params;
// console.log(id);

    // Ithe populate sobat 'select' vaprun fields filter kele ahet
    const team = await Team.findById(teamId ).populate({
      path: "members", // Kontya field la populate karayche
      select: "firstName lastName email" // Populated user object madhun fakt ya fields select kara
    });
    console.log(team);
    

    // Check kara ki team sapdli ka
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);

  } catch (err) {
    // Error la changlya prakare log karu shakto
    console.error("Error fetching team:", err); // Server-side logging sathi
    res.status(500).json({ error: "Something went wrong on the server." });
  }
};



export const leaveTeam = async (req, res) => {
  try {
    // Step 1: URL madhun teamId aani token madhun userId ghya
    const { teamId } = req.params;
    const userId = req.user.id;

    // Step 2: Database madhun team shodha
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    // Step 3: Check kara ki user kharach tya team cha member ahe ka
    const isMember = team.members.some(memberId => memberId.toString() === userId);
    if (!isMember) {
      return res.status(400).json({ message: "You are not a member of this team." });
    }

    // Step 4: Shevatcha member check kara (Last Member Logic)
    if (team.members.length === 1 && isMember) {
      // Jar ha user shevatcha member asel, tar purna team delete kara
      await Team.findByIdAndDelete(teamId);
      return res.status(200).json({ message: "You were the last member, so the team has been deleted." });
    } else {
      // Jar shevatcha member nasel, tar fakt tyala members array madhun kadha
      team.members = team.members.filter(memberId => memberId.toString() !== userId);
      await team.save();
      return res.status(200).json({ message: "You have successfully left the team." });
    }

  } catch (error) {
    console.error("Error in leaveTeam:", error);
    res.status(500).json({ message: "Something went wrong while leaving the team." });
  }
};