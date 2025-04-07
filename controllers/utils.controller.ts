import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

import "dotenv/config";

import fs from "fs";
import path from "path";

//Get all courses
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get course file
      const filePath = path.join(__dirname, "../data/courses.json");

      //check if file exists
      if (!fs.existsSync(filePath)) {
        return next(new ErrorHandler("Course File not found", 404));
      }

      //Read file
      const courses = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      res.status(200).json({
        courses,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Add a course
export const addCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, title, description } = req.body;

      await fs.promises.appendFile(
        path.join(__dirname, "../data/courses.json"),
        JSON.stringify({ id, title, description })
      );

      res.status(200).json({
        success: true,
        message: "Course added successfully",
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
