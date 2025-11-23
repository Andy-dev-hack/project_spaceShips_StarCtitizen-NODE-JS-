import express from "express";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import navesRouter from "./routes/naves.routes.js";
import patrolRouter from "./routes/patrol.routes.js";
import authRouter from "./routes/auth.routes.js";
// import auth from "./middleware/auth.middleware.js"; // Removed global auth

const app = express();
const PORT = process.env.PORT || 3000; // Changed to 3000

// Security and logging middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Middleware to handle JSON requests
app.use(express.json());

// Route definitions
app.use("/auth", authRouter);
// app.use(auth); // Removed global auth
app.use("/naves", navesRouter);
app.use("/patrol", patrolRouter);

// Swagger Documentation
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger.js";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error Handling Middleware (Must be last)
import { errorHandler } from "./middleware/error.middleware.js";
app.use(errorHandler);

// Export app for testing
export { app };

// Only start server if not in test mode
if (process.env.NODE_ENV !== "test") {
  // Database connection and server startup
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Express server listening at http://localhost:${PORT}`);
  });
}
