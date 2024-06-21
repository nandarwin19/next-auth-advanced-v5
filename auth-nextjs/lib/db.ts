import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!, {});
    console.log("MongoDB connected");
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
