import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../middleware/validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, login);

export default authRouter;
