import express from "express";
import { addTestScore, getUserTestScores, getUserRank } from "../controllers/score.controller";
import { isAuthenticated } from "../utils/auth";

const scoreRouter = express.Router();

scoreRouter.post("/tests/scores", isAuthenticated, addTestScore );
scoreRouter.get("/tests/scores", isAuthenticated, getUserTestScores );
scoreRouter.get("/rank/me", isAuthenticated, getUserRank);



export default scoreRouter;