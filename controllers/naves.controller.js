// 🔑 KEY CHANGE: Import as namespace object.
import * as navesService from "../services/naves.service.js";

/**
 * Gets and returns the complete list of ships.
 */
export const getNaves = async (req, res, next) => {
  try {
    // 🔄 Change: Access function through 'navesService' object
    const Naves = await navesService.getAllNaves(req.query);
    res.json(Naves);
  } catch (err) {
    next(err);
  }
};

/**
 * Creates a new ship with provided data.
 */
export const postNave = async (req, res, next) => {
  try {
    // 🔄 Change: Access function through 'navesService' object
    const newNave = await navesService.createNave(req.body);
    // Response 201 Created
    res.status(201).json(newNave);
  } catch (err) {
    // Mongoose error handling: Validation (400) or Duplicate (11000)
    if (err.name === "ValidationError" || err.code === 11000) {
      return res.status(400).json({ error: err.message });
    }
    console.error("Error creating ship:", err);
    next(err);
  }
};

/**
 * Executes massive correction of 'calidad' property.
 */
export const fixNavesCalidad = async (req, res, next) => {
  try {
    // 🔄 Cambio: Acceso a la función a través del objeto 'navesService'
    const result = await navesService.setCalidadNaves();
    // Response 200 OK with operation details
    res.status(200).json({
      message: `Quality correction completed. Documents found: ${result.matchedCount}, Documents modified: ${result.modifiedCount}.`,
      details: result,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Gets a ship by ID.
 */
export const getNaveById = async (req, res, next) => {
  try {
    const nave = await navesService.getNaveById(req.params.id);
    if (!nave) return res.status(404).json({ error: "Ship not found" });
    res.json(nave);
  } catch (err) {
    next(err);
  }
};

/**
 * Updates a ship by ID.
 */
export const updateNave = async (req, res, next) => {
  try {
    const updatedNave = await navesService.updateNave(req.params.id, req.body);
    if (!updatedNave) return res.status(404).json({ error: "Ship not found" });
    res.json(updatedNave);
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes a ship by ID.
 */
export const deleteNave = async (req, res, next) => {
  try {
    const deletedNave = await navesService.deleteNave(req.params.id);
    if (!deletedNave) return res.status(404).json({ error: "Ship not found" });
    res.json({ message: "Ship deleted successfully" });
  } catch (err) {
    next(err);
  }
};
