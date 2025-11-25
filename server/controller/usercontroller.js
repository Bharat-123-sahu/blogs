import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../model/useModel.js";

dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: "3d" });
};

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, Email, and Password are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      message: "User registered successfully",user:user
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error while registering user" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password){
      return res.status(400).json({ message: "Email and Password are required" })}


    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: "User login successful",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error while logging in" });
  }
};
