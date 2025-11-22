// Función middleware que recibe la petición (req), la respuesta (res) y next.
function auth(req, res, next) {
  // 1. VALIDACIÓN DE CABECERA Y FORMATO
  // Obtiene el valor del encabezado 'authorization'.
  const authHeader = req.headers["authorization"];

  // Verifica si el encabezado existe.
  if (!authHeader) {
    // Responde con 401 si falta el encabezado.
    return res
      .status(401)
      .send({
        message: "Se requiere un token de autorización (Authorization header).",
      });
  }

  // Verifica si el encabezado comienza con "Bearer ".
  if (!authHeader.startsWith("Bearer ")) {
    // Responde con 401 si el formato es incorrecto.
    return res
      .status(401)
      .send({ message: "Formato de token inválido. Use 'Bearer [token]'." });
  }

  // 2. EXTRACCIÓN Y AUTENTICACIÓN
  // Extrae el token, eliminando el prefijo "Bearer ".
  const token = authHeader.replace("Bearer ", "");

  // --- LÓGICA DE AUTENTICACIÓN REAL (Simulación con "123") ---
  if (token === "123") {
    // Adjunta los datos del usuario autenticado (ID, rol, etc.) a la petición.
    req.user = {
      id: "user-123",
      role: "admin", // Clave para la autorización posterior (rol)
      username: "Sentinel",
    };

    // 💡 Logging: Registra la acción del usuario.
    console.log(
      `[AUTH LOG] User ${req.user.username} (${req.user.role}) is accessing ${req.method} ${req.originalUrl}`
    );

    // Llama a next() para pasar al siguiente middleware o a la función de ruta.
    next();
  } else {
    // Responde con 401 si el token no coincide con el token simulado.
    res.status(401).send({ message: "Token no autorizado o inválido." });
  }
}

// Exporta la función auth para usarla en server.js.
export default auth;

/////////////////////////////////////////
// /**
//  * Middleware de autenticación con verificación de formato.
//  * Si es exitoso, adjunta req.user a la petición.
//  */
// function auth(req, res, next) {
//   // 1. VALIDACIÓN DE CABECERA Y FORMATO
//   const authHeader = req.headers["authorization"];

//   if (!authHeader) {
//     return res
//       .status(401)
//       .send({
//         message: "Se requiere un token de autorización (Authorization header).",
//       });
//   }

//   if (!authHeader.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .send({ message: "Formato de token inválido. Use 'Bearer [token]'." });
//   }

//   // 2. EXTRACCIÓN Y AUTENTICACIÓN (3)
//   const token = authHeader.replace("Bearer ", "");
//   // req.token = token; // Se puede almacenar si es necesario para logging.

//   // --- LÓGICA DE AUTENTICACIÓN REAL (Simulación con "123") ---
//   if (token === "123") {
//     // 💡 BUENA PRÁCTICA: Adjuntamos los datos del usuario a la petición.
//     req.user = {
//       id: "user-123",
//       role: "admin", // Clave para la autorización posterior
//       username: "Sentinel",
//     };
//     next(); // Pasa al siguiente middleware o a la ruta
//   } else {
//     // 401 si la verificación real del token falla
//     res.status(401).send({ message: "Token no autorizado o inválido." });
//   }
// }

// export default auth;
