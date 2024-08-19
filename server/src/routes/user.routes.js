import express from "express";
import { createUser } from "../controllers/user.controller.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  createUser
);

export default router;
