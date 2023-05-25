import mongoose from "mongoose";
import config from "./index";

const connectDB = async () => {
  try {
    const MONGO_URL = config.MONGO_URL;

    await mongoose.connect(MONGO_URL);
    console.log("----------------------------------------");
    console.log("Status: Connect DB success.");
    console.log("----------------------------------------");
  } catch (error) {
    console.log("----------------------------------------");
    console.log("Status: Connect DB fail!.");
    console.log("----------------------------------------");
    console.error(error);
  }
};

export default connectDB;
