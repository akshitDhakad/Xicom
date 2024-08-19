import express from "express";
import { createUser } from "../controllers/user.controller.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("fileUpload"), createUser);

export default router;
