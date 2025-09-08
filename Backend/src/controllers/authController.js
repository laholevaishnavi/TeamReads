import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already in use." }); // 409 means Conflict
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, password: hashed });
    const { password: pwd, ...userWithoutPassword } = user.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log("User found:", user); 

    if (!user) return res.status(400).json({ error: "Invalid Credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid Credentials" });
    console.log("JWT Secret:", process.env.JWT_SECRET);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const { password: pwd, ...userWithoutPassword } = user.toObject();
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JS from reading the cookie
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
      sameSite: "strict", // Mitigates CSRF attacks
      maxAge: 24 * 60 * 60 * 1000 // 1 day, same as JWT expiry
    });
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true // Logout madhe pan security add kara
  });
  res.status(200).json({ message: "Logout successful" }); // Send JSON response
}
// export const logout = async (req, res) => {
//   res.cookie('token', null, { expires: new Date(Date.now()), });
//   res.send("Logout Successful!!")
// }