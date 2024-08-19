import express from "express";
import { createUser } from "../controllers/user.controller.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Handle multiple file uploads under the field name "files"
router.post("/", upload.array("files", 10), createUser);

export default router;
