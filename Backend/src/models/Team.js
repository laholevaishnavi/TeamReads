import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Team name is required"],
    minlength: [3, "Team name must be at least 3 characters long"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Team description is required"],
    minlength: [40, "Description must be at least 40 words."],
    trim: true,
    default: 'No description provided for this team.', // A fallback default
  },
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
}, { timestamps: true });

export default mongoose.model("Team", teamSchema);
