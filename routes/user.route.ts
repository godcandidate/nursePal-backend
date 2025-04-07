import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/registration", registerUser);

userRouter.post("/login", loginUser);

export default userRouter;
