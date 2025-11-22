// Importamos el namespace del servicio para acceder a las funciones de DB.
import * as patrolService from "../services/patrol.service.js";

/**
 * [GET /patrol] Obtiene y devuelve la lista completa de patrullas.
 */
export const getPatrols = async (req, res) => {
  try {
    const Patrols = await patrolService.getAllPatrols();
    res.json(Patrols);
  } catch (err) {
    console.error("Error al obtener patrullas:", err);
    res.status(500).json({ error: "Error interno al obtener patrullas" });
  }
};

/**
 * [POST /patrol] Crea una nueva patrulla con los datos proporcionados en el cuerpo.
 */
export const postPatrol = async (req, res) => {
  try {
    const newPatrol = await patrolService.createPatrol(req.body);
    // Respuesta 201 Created
    res.status(201).json(newPatrol);
  } catch (err) {
    // Manejo de errores de Mongoose: Validación (400) o Duplicado (11000)
    if (err.name === "ValidationError" || err.code === 11000) {
      return res.status(400).json({ error: err.message });
    }
    console.error("Error al crear la patrulla:", err);
    res.status(500).json({ error: "Error interno al crear la patrulla." });
  }
};

/**
 * [PUT /patrol/:id] Actualiza una patrulla existente por su ID.
 */
export const putPatrol = async (req, res) => {
  try {
    const patrolId = req.params.id;
    const updateData = req.body;

    const updatedPatrol = await patrolService.updatePatrol(
      patrolId,
      updateData
    );

    // Si la Patrulla no se encuentra, Mongoose devuelve null o el original si no se cambia.
    if (!updatedPatrol) {
      return res
        .status(404)
        .json({ error: "Patrulla no encontrada para actualizar" });
    }

    // Nota: Corregido el código de respuesta. Se usa 200 (OK) en PUT si la actualización fue exitosa.
    // También corregido el payload para devolver el objeto correctamente.
    res.status(200).json(updatedPatrol);
  } catch (err) {
    // Manejo de errores de validación
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    console.error("Error al actualizar patrulla:", err);
    res.status(500).json({ error: "Error interno al actualizar la patrulla." });
  }
};
