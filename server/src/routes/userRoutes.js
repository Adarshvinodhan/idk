import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addUserDetails, getUserDetails } from "../controllers/userDetailController.js";
import parser from "../middlewares/upload.js";

export const userRouter = Router();

userRouter.get('/user/allusers', authenticateToken, getAllUsers);
userRouter.get('/user/profile/:id',getUserDetails)
userRouter.post('/user/profile/:id',parser.single('img'),addUserDetails)
