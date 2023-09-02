import express from "express";
import { getAll, uploadData } from "../controller/videoController.js";
const router = express.Router();

router.post("/upload", uploadData);
router.get("/getAll", getAll);

export default router;
