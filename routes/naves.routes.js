// routes/naves.routes.js (VERSIÓN ACTUALIZADA)
import { Router } from "express";
// Importa el nuevo middleware de autorización por rol.
import isRole from "../middleware/isRole.middleware.js";
import auth from "../middleware/auth.middleware.js";
// 🔑 CAMBIO CLAVE: Importamos las funciones del nuevo controlador
import {
  getNaves, // ⬅️ Importa el controlador
  postNave,
  fixNavesCalidad,
} from "../controllers/naves.controller.js";

const navesRouter = Router();

// Definición de rutas. Ahora mapean directamente a las funciones del Controlador.
// ➡️ Mapea la ruta al controlador (getNaves), no al servicio.
navesRouter.get("/", getNaves);
navesRouter.post("/", postNave);
navesRouter.put("/admin/fix-calidad", auth, isRole("admin"), fixNavesCalidad);

export default navesRouter;
//////////////////////////////////////////
// import { Router } from "express";

// // Importa las funciones de lógica de negocio desde el archivo de servicio
// // (Necesitamos crear services/naves.service.js a continuación)
// import {
//   getAllNaves,
//   createNave,
//   setCalidadNaves,
// } from "../services/naves.service.js";

// const navesRouter = Router();

// // Definición de la ruta GET para obtener todas las naves
// // Mapea la petición GET a /naves (gracias a app.use("/naves", navesRouter) en server.js)
// navesRouter.get("/", async (req, res) => {
//   try {
//     const Naves = await getAllNaves();
//     // 🛑 NOTA: El mensaje de error dice "Error al obtener usuarios",
//     // pero la lógica intenta obtener "Naves". Lo corrijo en el controlador,
//     // pero aquí deberíamos estar más atentos a la consistencia.
//     res.json(Naves);
//   } catch (err) {
//     // Si la llamada falla, devuelve un error 500
//     res.status(500).json({ error: "Error al obtener naves" });
//   }
// });
// // creacion de naves JSON nuevas
// navesRouter.post("/", async (req, res) => {
//   try {
//     const newNave = await createNave(req.body);
//     // Devuelve el código de estado 201 (Creado)
//     res.status(201).json(newNave);
//   } catch (err) {
//     // Si es un error de validación (ej. nombre duplicado o requerido), devuelve 400
//     if (err.name === "ValidationError" || err.code === 11000) {
//       return res.status(400).json({ error: err.message });
//     }
//     console.error(err);
//     res.status(500).json({ error: "Error al crear la nave." });
//   }
// });

// // [NUEVA RUTA] Ruta de administración para corregir datos
// navesRouter.put("/admin/fix-calidad", async (req, res) => {
//   try {
//     const result = await setCalidadNaves();
//     // El resultado contendrá cuántos documentos se modificaron
//     res.status(200).json({
//       message: `Corrección de calidad completada. Documentos encontrados: ${result.matchedCount}, Documentos modificados: ${result.modifiedCount}.`,
//       details: result,
//     });
//   } catch (err) {
//     console.error("Error al ejecutar la corrección masiva:", err);
//     res
//       .status(500)
//       .json({ error: "Error interno en la operación masiva de calidad." });
//   }
// });

// export default navesRouter;
