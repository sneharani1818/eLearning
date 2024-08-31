import express, { NextFunction, Request, Response } from "express";
export const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";

import { ErrorMiddleware } from "./middleware/error";
//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//cors=> cross origin resource sharing
dotenv.config();
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//routes
app.use("/api/v1", userRouter);

//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} is not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
