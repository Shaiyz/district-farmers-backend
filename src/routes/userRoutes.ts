import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser } from "../controllers/userController";

export const userRoutes = express.Router();

userRoutes.post(
  "/register",
  [body("username").notEmpty(), body("email").notEmpty(), body("password").isLength({ min: 6 })],
  registerUser
);

userRoutes.post(
  "/login",
  [body("username").notEmpty()],
  loginUser
);
