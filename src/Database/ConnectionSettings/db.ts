import mongoose from "mongoose";
import config from "../../config/ENV/config";

const connectDB = async () => {
  try {
    if (!config.mongoDBurl) {
      throw new Error("MONGODB_URI not defined in ENV Contatc Admin");
    }
    await mongoose.connect(config.mongoDBurl);
    console.log("MongoDB Connected...");
  } catch (error: any) {
    throw new Error(error);
  }
};

export default connectDB;
