// Role-based authorization middleware.
// Receives required role as argument (e.g., isRole('admin')).
const isRole = (requiredRole) => {
  // Returns the actual middleware function (req, res, next).
  return (req, res, next) => {
    // ⚠️ CRITICAL: This middleware assumes 'auth.middleware.js' has already executed
    // and attached the req.user object to the request.

    // 1. Verify if req.user exists (Previous authentication).
    if (!req.user) {
      // If req.user does not exist, authentication failed, return 403.
      return res.status(403).send({
        message: "Access denied. User not authenticated (or Auth failed).",
      });
    }

    // 2. Verify Role (Authorization).
    // Compares user role with required role (using toLowerCase for flexible comparison).
    if (
      req.user.role &&
      req.user.role.toLowerCase() === requiredRole.toLowerCase()
    ) {
      // User has required role, allow access.
      next();
    } else {
      // User is authenticated but lacks necessary role.
      // 403 Forbidden: Server understands request but refuses to authorize it.
      return res.status(403).send({
        message: `Access denied. Role required: ${requiredRole}.`,
      });
    }
  };
};

export default isRole;
