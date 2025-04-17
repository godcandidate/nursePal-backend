import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import scoreModel, { IScore } from "../models/score.model";
import rankModel from "../models/rank.model";

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

      //check if the score that exists is less than the new score
      const existingScore = await scoreModel.findOne({
        userId,
        testId,
        courseId,
      });

      if (existingScore && existingScore.score < score) {
        await scoreModel.updateOne(
          { userId, testId, courseId },
          { score, dateTaken }
        );
      }

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

//Get user highest score for a test
export const getUserRank = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      const rank = await rankModel.findById(userId);

      return res.status(200).json(rank);
    } catch (error: any) {
      console.error(error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Get user highest score for a test
export const updateRank = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      // Count the number of unique tests taken by the user
      const uniqueTestCount = (
        await scoreModel.distinct("testScoreId", { userId })
      ).length;

      //Find the highest score for the user using MongoDB sort
      const highestScoreDoc = await scoreModel
        .findOne({ userId })
        .sort({ score: -1 })
        .select("score")
        .lean();

      const highestScore = highestScoreDoc?.score;

      await rankModel.findOneAndUpdate(
        { _id: userId },
        {
          numberOfTestsTaken: uniqueTestCount,
          averageScore: highestScore,
        },
        { upsert: true, new: true } // Create if not exists, update if exists
      );

      return res.status(200).json(highestScore);
    } catch (error: any) {
      console.error(error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Get users highest test scores for a course
export const getHighestScoresByTest = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const courseId = req.params.id;

      const highestScoresPerTest = await scoreModel.aggregate([
        { $match: { userId, courseId } }, // Filter by userId
        {
          $group: {
            _id: "$testId",
            highestScore: { $max: "$score" },
          },
        },
        {
          $project: {
            testId: "$_id",
            highestScore: 1,

            _id: 0,
          },
        },
      ]);

      return res.status(200).json(highestScoresPerTest);
    } catch (error: any) {
      console.error(error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
