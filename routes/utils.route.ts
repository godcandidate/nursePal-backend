import express from "express";
import { getAllCourses } from "../controllers/utils.controller";

const utilsRouter = express.Router();

utilsRouter.get("/courses", getAllCourses);

export default utilsRouter;
