import mongoose, { Document, Model, Schema } from "mongoose";

interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
}
