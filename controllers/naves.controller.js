// 🔑 CAMBIO CLAVE: Importación como objeto namespace.
import * as navesService from "../services/naves.service.js";

/**
 * Obtiene y devuelve la lista completa de naves.
 */
export const getNaves = async (req, res) => {
  try {
    // 🔄 Cambio: Acceso a la función a través del objeto 'navesService'
    const Naves = await navesService.getAllNaves();
    res.json(Naves);
  } catch (err) {
    console.error("Error al obtener naves:", err);
    res.status(500).json({ error: "Error interno al obtener naves" });
  }
};

/**
 * Crea una nueva nave con los datos proporcionados.
 */
export const postNave = async (req, res) => {
  try {
    // 🔄 Cambio: Acceso a la función a través del objeto 'navesService'
    const newNave = await navesService.createNave(req.body);
    // Respuesta 201 Created
    res.status(201).json(newNave);
  } catch (err) {
    // Manejo de errores de Mongoose: Validación (400) o Duplicado (11000)
    if (err.name === "ValidationError" || err.code === 11000) {
      return res.status(400).json({ error: err.message });
    }
    console.error("Error al crear la nave:", err);
    res.status(500).json({ error: "Error interno al crear la nave" });
  }
};

/**
 * Ejecuta la corrección masiva de la propiedad 'calidad'.
 */
export const fixNavesCalidad = async (req, res) => {
  try {
    // 🔄 Cambio: Acceso a la función a través del objeto 'navesService'
    const result = await navesService.setCalidadNaves();
    // Respuesta 200 OK con detalles de la operación
    res.status(200).json({
      message: `Corrección de calidad completada. Documentos encontrados: ${result.matchedCount}, Documentos modificados: ${result.modifiedCount}.`,
      details: result,
    });
  } catch (err) {
    console.error("Error al ejecutar la corrección masiva:", err);
    res
      .status(500)
      .json({ error: "Error interno en la operación masiva de calidad" });
  }
};
