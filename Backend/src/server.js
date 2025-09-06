import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import scraperRoutes from "./routes/scraperRoutes.js";

dotenv.config({ quiet: true });
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/", authRoutes);
app.use("/", teamRoutes);
app.use("/", linkRoutes);
app.use("/api", scraperRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
