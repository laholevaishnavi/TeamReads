import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import cookieParser from "cookie-parser"

dotenv.config({ quiet: true });
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
   credentials: true 
}));
app.use(express.json());
app.use(cookieParser()); 

// DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/links', linkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
