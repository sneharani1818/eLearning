import { app } from "./app";
import dotenv from "dotenv";
import connectDB from "./utils/db";
dotenv.config();

//create server
app.listen(process.env.PORT, () => {
  console.log(`Server is connected with port ${process.env.PORT}`);
  connectDB();
});
