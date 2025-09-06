import Team from "../models/Team.js";
import {User} from "../models/User.js";
import { nanoid } from "nanoid";

export const createTeam = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const team = new Team({ name, code, members: [userId] });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


import mongoose from "mongoose";

export const getUserTeams = async (req, res) => {
  try {
    const { userId } = req.params;
    const teams = await Team.find({ members: new mongoose.Types.ObjectId(userId) });
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const joinTeam = async (req, res) => {
  try {
    const { code, userId } = req.body;
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
    const team = await Team.findById(req.params.id).populate("members");
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
