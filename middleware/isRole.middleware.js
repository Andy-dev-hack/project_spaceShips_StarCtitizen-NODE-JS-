// Middleware de autorización por rol.
// Recibe el rol requerido como argumento (ej: isRole('admin')).
const isRole = (requiredRole) => {
  // Retorna la función middleware real (req, res, next).
  return (req, res, next) => {
    // ⚠️ CRÍTICO: Este middleware asume que 'auth.middleware.js' ya se ejecutó
    // y ha adjuntado el objeto req.user a la petición.

    // 1. Verificar si req.user existe (Autenticación previa).
    if (!req.user) {
      // Si req.user no existe, algo falló en la autenticación, devolvemos 403.
      return res
        .status(403)
        .send({
          message: "Acceso denegado. Usuario no autenticado (o fallo de Auth).",
        });
    }

    // 2. Verificar el Rol (Autorización).
    // Compara el rol del usuario con el rol requerido (usamos toLowerCase para hacer la comparación más flexible).
    if (
      req.user.role &&
      req.user.role.toLowerCase() === requiredRole.toLowerCase()
    ) {
      // El usuario tiene el rol requerido, permite el acceso.
      next();
    } else {
      // El usuario está autenticado, pero no tiene el rol necesario.
      // 403 Forbidden: El servidor entiende la petición pero se niega a autorizarla.
      return res
        .status(403)
        .send({
          message: `Acceso denegado. Se requiere el rol: ${requiredRole}.`,
        });
    }
  };
};

export default isRole;
