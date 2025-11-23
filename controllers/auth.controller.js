import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key_dev_123";

/**
 * Registers a new user
 */
export const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate previous existence
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role: role || "user", // Default user, but allow sending admin for testing now
    });

    const userSaved = await newUser.save();

    // Create token (optional on register, but useful)
    const token = jwt.sign(
      { id: userSaved._id, role: userSaved.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Logs in and returns a token
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: userFound._id, role: userFound.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
