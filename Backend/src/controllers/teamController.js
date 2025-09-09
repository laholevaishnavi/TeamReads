import Team from "../models/Team.js";
import { nanoid } from "nanoid";
import mongoose from "mongoose";



export const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id; 

    if (!userId) {
      return res.status(400).json({ message: "User not identified. Please login again." });
    }

    let code;
    let teamExists = true;
    while (teamExists) {
      // import { nanoid } from "nanoid";
      code = Math.random().toString(36).substring(2, 8).toUpperCase(); 
      teamExists = await Team.findOne({ code });
    }

    const team = new Team({
      name,
      description,
      code,
      members: [userId]
    });
    await team.save();

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
    if (!req.user || !req.user.id) {
      return res.status(500).json({ error: "User information could not be processed." });
    }

    const userId = req.user.id;

    const teams = await Team.find({ members: userId });

    res.status(200).json(teams);
    
  } catch (err) {
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

    const team = await Team.findById(teamId ).populate({
      path: "members", 
      select: "firstName lastName email" 
    });
    console.log(team);
    

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);

  } catch (err) {
    res.status(500).json({ error: "Something went wrong on the server." });
  }
};



export const leaveTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const userId = req.user.id;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    const isMember = team.members.some(memberId => memberId.toString() === userId);
    if (!isMember) {
      return res.status(400).json({ message: "You are not a member of this team." });
    }

    if (team.members.length === 1 && isMember) {
      await Team.findByIdAndDelete(teamId);
      return res.status(200).json({ message: "You were the last member, so the team has been deleted." });
    } else {
      team.members = team.members.filter(memberId => memberId.toString() !== userId);
      await team.save();
      return res.status(200).json({ message: "You have successfully left the team." });
    }

  } catch (error) {
    console.error("Error in leaveTeam:", error);
    res.status(500).json({ message: "Something went wrong while leaving the team." });
  }
};