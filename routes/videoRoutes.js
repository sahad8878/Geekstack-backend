import express from "express";
import { getAll, uploadData } from "../controller/videoController.js";
import {protect} from '../middlewares/authMiddlwares.js'
const router = express.Router();

router.post("/upload",protect, uploadData);
router.get("/getAll",protect, getAll);

export default router;
