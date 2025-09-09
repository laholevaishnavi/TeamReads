import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if cookies exist and have a token
  console.log("1. Checking for cookies...");
  if (req.cookies?.token) {
    try {
      token = req.cookies.token;

      // 2. Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 3. Find the user in the database
      req.user = await User.findById(decoded.id).select("-password");
      
      if (req.user) {
        next(); 
      } else {
        res.status(401).json({ message: "Not authorized, user not found" });
      }

    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // If cokiee not found
    res.status(401).json({ message: "Not authorized, no token" });
  }
};