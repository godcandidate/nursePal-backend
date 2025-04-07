import express from "express";
import {
  getAllCourses,
  getCourseTests,
  getTest,
} from "../controllers/utils.controller";

const utilsRouter = express.Router();

utilsRouter.get("/courses", getAllCourses);

utilsRouter.get("/courses/:courseId", getCourseTests);

utilsRouter.get("/courses/:courseId/:testId", getTest);

export default utilsRouter;
