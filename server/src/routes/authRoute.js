import { Router } from "express";
import { getToken, loginUser, logout, registerUser } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post('/signup',registerUser);
authRouter.post('/login',loginUser);
authRouter.post('/logout',logout)
authRouter.post('/getacctoken',getToken);
