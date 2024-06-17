import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("Error connecting to mongodb", error);
    process.exit(1);
  }
};

export default connectMongoDB;
