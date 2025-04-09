import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.models";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

import "dotenv/config";
import { sendToken } from "../utils/jwt";

//using interface for req.user
declare module "express" {
  interface Request {
    user?: IUser;
  }
}

//Register user interface
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

//Register user
export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      //Check if email already exists
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      //store user data in database
      await userModel.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//login user
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;
      if (!email || !password) {
        res.status(400).json({
          message: "Invalid credentials",
        });
      }

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 403));
      }

      //check password
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 403));
      }
      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 403));
    }
  }
);
