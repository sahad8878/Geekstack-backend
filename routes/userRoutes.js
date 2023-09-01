import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser
} from "../controller/userController.js";


router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/logout", logoutUser);


export default router;