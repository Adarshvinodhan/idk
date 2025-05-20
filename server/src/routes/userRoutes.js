import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

export const userRouter = Router();

userRouter.get('/allusers',authenticateToken,getAllUsers)