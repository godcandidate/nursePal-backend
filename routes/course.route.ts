import express from "express";
import {
  getAllCourses,
  addCourse,
  deleteCourse,
} from "../controllers/course.controller";

const courseRouter = express.Router();

courseRouter.get("/courses", getAllCourses);

courseRouter.post("/courses", addCourse);

courseRouter.delete("/courses", deleteCourse);

export default courseRouter;
