import mongoose from "mongoose";
import { config } from "../../config/config";

export const ConnectToDb = async () => {
  try {
    await mongoose.connect(config.mongo.url);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};