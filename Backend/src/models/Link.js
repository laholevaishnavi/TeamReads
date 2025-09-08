import validator from "validator";
import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "URL is required"],
    trim: true,
    validate: [validator.isURL, "Please provide a valid URL"],
  },
  title: {
    type: String,
    default: "No Title",
  },
  description: {
    type: String,
    default: "No Description",
  },
  image: {
    type: String,
    default: null,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Link", linkSchema);
