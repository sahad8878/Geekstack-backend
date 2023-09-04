import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin
} from "../controller/userController.js";


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/googleLogin", googleLogin);
router.patch("/logout", logoutUser);


export default router;