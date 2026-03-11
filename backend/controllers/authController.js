import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires: Date.now() + 10 * 60 * 1000
    });

    await user.save();

    res.status(201).json({
      message: "User registered. Verification code generated.",
      verificationCode
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {

  try {

    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    if (user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({ message: "Verification code expired" });
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await user.save();

    res.json({ message: "Email verified successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};