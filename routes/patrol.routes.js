// Import Express Router constructor.
import { Router } from "express";

// Import role-based authorization middleware (CORRECTION).
import isRole from "../middleware/isRole.middleware.js";
import auth from "../middleware/auth.middleware.js";

// Import controller functions that handle request logic.
import {
  getPatrols,
  postPatrol,
  putPatrol,
} from "../controllers/patrol.controller.js";
import { validateCreatePatrol } from "../middleware/validators/patrol.validator.js";

// Initialize router.
const patrolRouter = Router();

// 1. GET /patrol: Get all patrols.
patrolRouter.get("/", getPatrols);

// 2. POST /patrol: Create a new patrol.
patrolRouter.post("/", validateCreatePatrol, postPatrol);

// 3. PUT /patrol/:id: Update a specific patrol by its ID.
// PROTECTED ROUTE: Requires 'admin' role to modify a patrol.
patrolRouter.put("/:id", auth, isRole("admin"), putPatrol);

// Export router to be used in server.js.
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
