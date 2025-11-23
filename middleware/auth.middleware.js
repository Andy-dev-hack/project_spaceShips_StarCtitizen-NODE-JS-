import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key_dev_123";

function auth(req, res, next) {
  // 1. VALIDACIÓN DE CABECERA Y FORMATO
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send({
      message: "Se requiere un token de autorización (Authorization header).",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ message: "Formato de token inválido. Use 'Bearer [token]'." });
  }

  // 2. EXTRACCIÓN Y VERIFICACIÓN
  const token = authHeader.replace("Bearer ", "");

  try {
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Adjuntar usuario decodificado a la petición
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).send({ message: "Token inválido o expirado." });
  }
}

export default auth;
