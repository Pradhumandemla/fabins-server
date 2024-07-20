import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
  // updatePost,
  deletePost,
  commentPost
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// READ ALL
router.get("/", verifyToken, getFeedPosts);

// READ 
router.get("/:user", verifyToken, getUserPosts);

// CREATE
router.post("/", verifyToken, upload.array("picture", 10), createPost);

// UPDATE 
// router.post("/edit/:postId", verifyToken, upload.array("picture", 10), updatePost);

// LIKE
router.get("/like/:postId", verifyToken, likePost);

// COMMENT
router.post("/comment/:postId", verifyToken, commentPost);

// DELETE
router.get("/delete/:postId", verifyToken, deletePost);

export default router;
