import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "./ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

import "dotenv/config";

//Authenticate user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Access the authorization header to validate the request
      const authHeader = req.headers.authorization;

      // made changes to fit swagger api docs
      if (!authHeader /*|| !authHeader.startsWith("Bearer ")*/) {
        return res.status(401).json({
          error: "Authentication Failed, login to access this resource",
        });
      }

      // Extract the token from the authorization header
      const token = authHeader.split(" ")[1];

      //Verify token
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload;
      if (!decoded) {
        return next(new ErrorHandler("Access token not valid", 400));
      }

      //Get user
      const user = decoded;
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }
      req.user = user as any;
      next();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
