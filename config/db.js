import mongoose from "mongoose";

/**
 * Function to establish connection to MongoDB database.
 * Uses Mongoose and the connection URL defined in the .env file (MONGO_URI).
 */
export const connectDB = async () => {
  // Ensure URI is available
  const dbUrl = process.env.MONGO_URI;
  if (!dbUrl) {
    console.error("Error: MONGO_URI variable is not defined in .env file");
    process.exit(1);
  }

  try {
    // Try to connect to the database using the URL
    await mongoose.connect(dbUrl);
    console.log("📀 DB connected");
  } catch (err) {
    // If connection fails, log the error and exit process.
    console.error("Connection error:", err);
    // Terminate process with failure if connection fails
    process.exit(1);
  }
};
