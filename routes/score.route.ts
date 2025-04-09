import express from "express";
import { addTestScore, getUserTestScores } from "../controllers/score.controller";
import { isAuthenticated } from "../utils/auth";

const scoreRouter = express.Router();

scoreRouter.post("/tests/scores", isAuthenticated, addTestScore );
scoreRouter.get("/tests/scores", isAuthenticated, getUserTestScores );


export default scoreRouter;