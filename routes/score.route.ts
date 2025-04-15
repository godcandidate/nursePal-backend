import express from "express";
import { addTestScore, getUserTestScores, getUserRank, getHighestScoresByTest } from "../controllers/score.controller";
import { isAuthenticated } from "../utils/auth";

const scoreRouter = express.Router();

scoreRouter.post("/tests/scores", isAuthenticated, addTestScore );
scoreRouter.get("/tests/scores/me", isAuthenticated, getUserTestScores );
scoreRouter.get("/scores/:id", isAuthenticated, getHighestScoresByTest );
scoreRouter.get("/rank/me", isAuthenticated, getUserRank);



export default scoreRouter;