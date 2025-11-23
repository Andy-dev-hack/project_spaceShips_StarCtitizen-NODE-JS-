import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key_dev_123";

function auth(req, res, next) {
  // 1. HEADER AND FORMAT VALIDATION
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send({
      message: "Authorization token required (Authorization header).",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ message: "Invalid token format. Use 'Bearer [token]'." });
  }

  // 2. EXTRACTION AND VERIFICATION
  const token = authHeader.replace("Bearer ", "");

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid or expired token." });
  }
}

export default auth;
