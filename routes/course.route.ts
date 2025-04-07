import express from "express";
import { getAllCourses } from "../controllers/course.controller";

const utilsRouter = express.Router();

utilsRouter.get("/courses", getAllCourses);

export default utilsRouter;
