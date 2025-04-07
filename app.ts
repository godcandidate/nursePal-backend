import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import testRouter from "./routes/test.route";
import "dotenv/config";

const app = express();

//body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: "*",
  })
);

// routes
app.use("/api/v1", userRouter, courseRouter, testRouter);

//testing api
app.use("/test", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

export { app };
