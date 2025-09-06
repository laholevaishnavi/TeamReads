import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Team name is required"],
    minlength: [3, "Team name must be at least 3 characters long"],
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
}, { timestamps: true });

export default mongoose.model("Team", teamSchema);
