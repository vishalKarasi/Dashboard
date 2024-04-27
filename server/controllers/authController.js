import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken.js";
import { Admin } from "../models/adminModel.js";
import { handleCloudinaryUpload } from "../middlewares/cloudinary.js";

// admin registration
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ message: "Admin Already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      profilePic: await handleCloudinaryUpload(req.file.buffer),
      password: hashPassword,
    });

    await newAdmin.save();
    return res.status(201).json({ message: "Register successful" });
  } catch (error) {
    next(error);
  }
};

// admin login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin does not exist" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = createToken("accessToken", admin._id);
    const refreshToken = createToken("refreshToken", admin._id);

    res.cookie("refresh_token", refreshToken, {
      domain: process.env.DOMAIN,
      path: "/",
      maxAge: parseInt(process.env.MAX_AGE, 10),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      id: admin._id,
      accessToken,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

// admin logout

export const logout = async (req, res, next) => {
  try {
    if (!req.cookies.refresh_token) {
      return res.status(400).json({ message: "Cookie not found" });
    }

    res.clearCookie("refresh_token");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

// refresh access token
export const refresh = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken)
      return res.status(404).json({ message: "Refresh Token doesnt exist" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      const accessToken = createToken("accessToken", admin.id);
      return res.status(200).json({
        id: admin.id,
        accessToken,
        message: "Refresh successful",
      });
    });
  } catch (error) {
    next(error);
  }
};
