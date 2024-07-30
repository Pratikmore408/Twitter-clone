import express from "express";

import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPost,
  getFollowingposts,
  getLikedPost,
  getUserPosts,
  likePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", protectedRoute, getAllPost);
router.get("/following", protectedRoute, getFollowingposts);
router.get("/user/:username", protectedRoute, getUserPosts);

router.get("/likes/:id", protectedRoute, getLikedPost);

router.post("/create", protectedRoute, createPost);
router.post("/like/:id", protectedRoute, likePost);
router.post("/comment/:id", protectedRoute, commentOnPost);
router.delete("/:id", protectedRoute, deletePost);

export default router;
