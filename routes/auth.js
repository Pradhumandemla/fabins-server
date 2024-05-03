import express from "express";
import { login, register } from "../controllers/auth.js";
// import initializeUploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/login", login);

// router.post("/auth/register", initializeUploadMiddleware.single("picture"), register);


export default router;
