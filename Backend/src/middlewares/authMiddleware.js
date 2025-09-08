import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  console.log("--- 🛡️  Protect Middleware Started 🛡️ ---");
  let token;

  // 1. Check if cookies exist and have a token
  console.log("1. Checking for cookies...");
  if (req.cookies?.token) {
    console.log("   ✅ Cookie found!");
    try {
      token = req.cookies.token;

      // 2. Verify the token
      console.log("2. Verifying token...");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("   ✅ Token verified. Decoded User ID:", decoded.id);

      // 3. Find the user in the database
      console.log("3. Finding user in DB...");
      req.user = await User.findById(decoded.id).select("-password");
      
      if (req.user) {
        console.log("   ✅ User found:", req.user.firstName, req.user.email);
        console.log("--- ✅ Middleware successful. Passing to controller... ---");
        next(); // Sagla thik aslyas pudhe ja
      } else {
        console.log("   ❌ User not found in DB for this token.");
        res.status(401).json({ message: "Not authorized, user not found" });
      }

    } catch (error) {
      console.log("   ❌ Token verification FAILED. Error:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // Jar cookie sapdli nahi
    console.log("   ❌ No cookie found in the request!");
    res.status(401).json({ message: "Not authorized, no token" });
  }
};