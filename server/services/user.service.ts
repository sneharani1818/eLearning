import userModel from "../models/user.model";
import { Response } from "express";
import { redis } from "../utils/redis";

//get user by id
export const getUserById = async (id: string, res: Response) => {
  // const user = await userModel.findById(id); //this can be written as following two lines
  const userJson = await redis.get(id);
  const user = userJson ? JSON.parse(userJson) : "";
  console.log(user);
  res.status(201).json({
    success: true,
    user,
  });
};
