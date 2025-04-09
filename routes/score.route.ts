import express from "express";
import { addTestScore } from "../controllers/score.controller";
import { isAuthenticated } from "../utils/auth";

const scoreRouter = express.Router();

scoreRouter.post("/score", isAuthenticated, addTestScore );

export default scoreRouter;