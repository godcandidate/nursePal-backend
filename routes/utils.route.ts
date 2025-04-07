import express from "express";
import { getAllCourses, getCourseTests } from "../controllers/utils.controller";

const utilsRouter = express.Router();

utilsRouter.get("/courses", getAllCourses);

utilsRouter.get("/courses/:courseId", getCourseTests);

export default utilsRouter;
