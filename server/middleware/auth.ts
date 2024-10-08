import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

import dotenv from "dotenv";
import { authorizeRoles } from "../controllers/user.controller";
dotenv.config();

//authenticated user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token: any = req.cookies.access_token;
    console.log(access_token);
    console.log(req.body);
    //if user not logged in
    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    //
    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    if (!decoded) {
      return next(new ErrorHandler("Access token in not valid", 400));
    }
    const user = await redis.get(decoded.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    req.user = JSON.parse(user); // error fixing in custom.d.ts

    next();
  }
);
