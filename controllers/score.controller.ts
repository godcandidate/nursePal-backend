import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import scoreModel, { IScore } from "../models/score.model";

import "dotenv/config";

export interface ITestScore extends Document {
  courseId: string;
  testId: string;
  score: number;
  dateTaken: Date;
}

//Add a score for a test
export const addTestScore = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const { courseId, testId, score, dateTaken } = req.body as ITestScore;

      //Generate test score id
      const testScoreId = `${courseId}-test${testId}`;

      //store score data in database
      await scoreModel.create({
        userId,
        testScoreId,
        score,
        dateTaken,
      });

      res.status(201).json({
        success: true,
        message: "Score Added successfully",
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Get all user scores for a test
export const getUserTestScores = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      // Query all scores for user
      const testScores = await scoreModel.find({ userId: userId });

      // Respond with the filtered tickets
      return res.status(200).json(testScores);
      
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
