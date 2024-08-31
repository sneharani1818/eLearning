import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();
const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("Redis connected");
    return process.env.REDIS_URL;
  }
  throw new Error("Reddis connection failed");
};
export const redis = new Redis(redisClient());
