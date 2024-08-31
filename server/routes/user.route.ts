import express from "express";
import {
  activationUser,
  loginUser,
  logoutUser,
  registrationUser,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activationUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

export default userRouter;
