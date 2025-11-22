// Importa el constructor Router de Express.
import { Router } from "express";

// Importa el middleware de autorización por rol (CORRECCIÓN).
import isRole from "../middleware/isRole.middleware.js";

// Importa las funciones del controlador que manejan la lógica de la petición.
import {
  getPatrols,
  postPatrol,
  putPatrol,
} from "../controllers/patrol.controller.js";

// Inicializa el enrutador.
const patrolRouter = Router();

// 1. GET /patrol: Obtiene todas las patrullas.
patrolRouter.get("/", getPatrols);

// 2. POST /patrol: Crea una nueva patrulla.
patrolRouter.post("/", postPatrol);

// 3. PUT /patrol/:id: Actualiza una patrulla específica por su ID.
// RUTA PROTEGIDA: Requiere el rol 'admin' para modificar una patrulla.
patrolRouter.put("/:id", isRole("admin"), putPatrol);

// Exporta el enrutador para que pueda ser usado en server.js.
export default patrolRouter;

///////////////////////////////////

// import { Router } from "express";

// import {
//   getAllPatrols,
//   createPatrol,
//   updatePatrol,
// } from "../services/patrol.service.js";

// const patrolRouter = Router();

// //patrol get info
// patrolRouter.get("/", async (req, res) => {
//   try {
//     const Patrols = await getAllPatrols();
//     res.json(Patrols);
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener patrols" });
//   }
// });
// // patrol post create patrol
// patrolRouter.post("/", async (req, res) => {
//   try {
//     const newPatrol = await createPatrol(req.body);
//     res.status(201).json(newPatrol);
//   } catch (err) {
//     if (err.name === "ValidationError" || err.code === 11000) {
//       return res.status(400).json({ error: err.message });
//     }
//     console.error(err);
//     res.status(500).json({ error: "Error al crear la patrol." });
//   }
// });

// // ruta PUT /patrol/:id: Actualizar patrol por ID
// patrolRouter.put("/:id", async (req, res) => {
//   try {
//     const patrolId = req.params.id;
//     const updateData = req.body;

//     const updatedPatrol = await updatePatrol(patrolId, updateData);
//     // Si la Patrulla no se encuentra, Mongoose devuelve null
//     if (!updatedPatrol) {
//       return res.status(404).json({ error: "patrol no encontrada" });
//     }

//     res.status(404).json({ updatedPatrol });
//   } catch (err) {
//     // Manejo de errores de validación (si se intenta actualizar con datos inválidos)
//     if (err.name === "ValidationError") {
//       return res.status(400).json({ error: err.message });
//     }
//     console.error("Error al actualizar patrulla:", err);
//     // 500 Internal Server Error
//     res.status(500).json({ error: "Error interno al actualizar la patrulla." });
//   }
// });

// export default patrolRouter;
