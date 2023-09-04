import jwt from "jsonwebtoken";
import User from "../model/user.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization,"author");
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
    console.log(token,"token",process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded,"deco");
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      console.log(error);
      throw new Error("Not autherized ,token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not autherized, No token");
  }
});
