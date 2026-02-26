import express from "express";
import { registerUser, login, authUser, logout } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.get("/is-auth",authUser);
userRouter.get("/logout",logout);

export default userRouter;
