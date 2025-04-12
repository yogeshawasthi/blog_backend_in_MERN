import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";  // Corrected import
import dotenv from "dotenv";
dotenv.config();


export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export const logoutUser = (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({ message: "Logout successful!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};