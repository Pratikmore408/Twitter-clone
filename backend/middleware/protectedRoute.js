import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ error: "Unauthorized!! No token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      res.status(401).json({ error: "Unauthorized!! Invalid Token" });
    }

    const user = await User.findById(decode.userId);
    if (!user) {
      res.status(404).json({ error: "User not found!!" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protected Route middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
