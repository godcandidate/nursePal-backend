import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

import "dotenv/config";

import fs from "fs";
import path from "path";

//Get tests for a course
export const getCourseTests = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;

      //Get meta file
      const metaFilePath = path.join(
        __dirname,
        `../data/${courseId}/meta.json`
      );

      //check if file exists
      if (!fs.existsSync(metaFilePath)) {
        return next(new ErrorHandler("Meta file not found", 404));
      }

      //Read file
      const meta = JSON.parse(fs.readFileSync(metaFilePath, "utf-8"));

      res.status(200).json({
        meta,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Get a test for a course
export const getTest = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, testId } = req.params;

      //Get meta file
      const metaFilePath = path.join(
        __dirname,
        `../data/${courseId}/${testId}.json`
      );

      //check if file exists
      if (!fs.existsSync(metaFilePath)) {
        return next(new ErrorHandler("Meta file not found", 404));
      }

      //Read file
      const meta = JSON.parse(fs.readFileSync(metaFilePath, "utf-8"));

      res.status(200).json({
        meta,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
