import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Listen for connection events
    mongoose.connection.on('connected', () => console.log("MongoDB Connected"));

    // Use the correct environment variable
    const mongoURI = process.env.MONGO_URI?.trim();
    if (!mongoURI.startsWith("mongodb://") && !mongoURI.startsWith("mongodb+srv://")) {
      throw new Error("MongoDB URI must start with mongodb:// or mongodb+srv://");
    }

    // Connect without deprecated options
    await mongoose.connect(mongoURI);

  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
};

export default connectDB;
