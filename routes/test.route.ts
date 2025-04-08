import express from "express";
import { getCourseTests, getTest } from "../controllers/test.controller";

const testRouter = express.Router();

testRouter.get("/courses/:courseId", getCourseTests)

testRouter.get("/courses/:courseId/:testId", getTest);

export default testRouter;
