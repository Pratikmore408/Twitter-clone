import express from "express";

import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  followUnfollowUser,
  getUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", protectedRoute, getUserProfile);
// router.post("/suggested", protectedRoute, getSuggestedUser);

router.post("/follow/:id", protectedRoute, followUnfollowUser);

// router.post("/update", protectedRoute, updateUserProfile);

export default router;
