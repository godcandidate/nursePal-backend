import express from "express";
import { getTest } from "../controllers/test.controller";

const testRouter = express.Router();

testRouter.get("/courses/:courseId/:testId", getTest);

export default testRouter;
