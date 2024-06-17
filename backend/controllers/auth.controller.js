import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../library/utils/generatetoken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(email)) {
      return res.status(400).json({ error: "Invalid Email format" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is Already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is Already taken" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be minimum 6 character" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      console.log(error);
      return res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in Signup Controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  res.json({
    data: "you hit login endpoints",
  });
};

export const logout = async (req, res) => {
  res.json({
    data: "you hit logout endpoints",
  });
};
