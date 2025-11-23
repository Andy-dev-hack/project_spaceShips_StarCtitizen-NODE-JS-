/**
 * Centralized Error Handling Middleware
 * Catches errors passed via next(err) and sends a standardized JSON response.
 */
export const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  // Default status code 500 (Internal Server Error) if not specified
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: message,
    // Include stack trace only in development mode for debugging
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
