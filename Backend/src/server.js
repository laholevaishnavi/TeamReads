import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import cookieParser from "cookie-parser"
import cron from 'node-cron';
import { findAndPostArticles } from "./tasks/botTask.js";
import { seedNewsBot } from './config/seed.js'; // 👈 IMPORT

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

cron.schedule('0 9 * * *', () => {
  console.log('Running the daily article finder bot...');
  findAndPostArticles();
}, {
  timezone: "Asia/Kolkata"
});

console.log('NewsBot task is scheduled to run daily at 9 AM.');


// comment this line to prevent immediate execution, this is only for testing.
// findAndPostArticles(); 