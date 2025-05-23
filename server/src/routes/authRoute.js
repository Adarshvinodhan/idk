import { Router } from "express";
import { getToken, loginUser, logout, registerUser } from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../validators/authValidator.js";
import { validate } from "../middlewares/validate.js";

export const authRouter = Router();

authRouter.post('/auth/signup',registerValidation,validate,registerUser);
authRouter.post('/auth/login',loginValidation,validate,loginUser);
authRouter.post('/auth/logout',logout)
authRouter.post('/auth/getacctoken',getToken);
