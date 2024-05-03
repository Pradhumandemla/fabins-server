import express from "express";
import { getFeedPosts, getUserPosts, likePost, createPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
// import initializeUploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
// router.post("/", verifyToken, initializeUploadMiddleware.array("picture", 10), createPost);

export default router;
