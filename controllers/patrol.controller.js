// Import service namespace to access DB functions.
import * as patrolService from "../services/patrol.service.js";

/**
 * [GET /patrol] Gets and returns the complete list of patrols.
 */
export const getPatrols = async (req, res, next) => {
  try {
    const Patrols = await patrolService.getAllPatrols(req.query);
    res.json(Patrols);
  } catch (err) {
    next(err);
  }
};

/**
 * [POST /patrol] Creates a new patrol with data provided in body.
 */
export const postPatrol = async (req, res, next) => {
  try {
    const newPatrol = await patrolService.createPatrol(req.body);
    // Response 201 Created
    res.status(201).json(newPatrol);
  } catch (err) {
    // Mongoose error handling: Validation (400) or Duplicate (11000)
    if (err.name === "ValidationError" || err.code === 11000) {
      return res.status(400).json({ error: err.message });
    }
    console.error("Error creating patrol:", err);
    next(err);
  }
};

/**
 * [PUT /patrol/:id] Updates an existing patrol by its ID.
 */
export const putPatrol = async (req, res, next) => {
  try {
    const patrolId = req.params.id;
    const updateData = req.body;

    const updatedPatrol = await patrolService.updatePatrol(
      patrolId,
      updateData
    );

    // If Patrol is not found, Mongoose returns null or original if not changed.
    if (!updatedPatrol) {
      return res.status(404).json({ error: "Patrol not found to update" });
    }

    // Note: Corrected response code. Use 200 (OK) in PUT if update was successful.
    // Also corrected payload to return object correctly.
    res.status(200).json(updatedPatrol);
  } catch (err) {
    // Validation error handling
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    console.error("Error updating patrol:", err);
    next(err);
  }
};

/**
 * [GET /patrol/:id] Gets a patrol by ID.
 */
export const getPatrolById = async (req, res, next) => {
  try {
    const patrol = await patrolService.getPatrolById(req.params.id);
    if (!patrol) return res.status(404).json({ error: "Patrol not found" });
    res.json(patrol);
  } catch (err) {
    next(err);
  }
};

/**
 * [DELETE /patrol/:id] Deletes a patrol by ID.
 */
export const deletePatrol = async (req, res, next) => {
  try {
    const deletedPatrol = await patrolService.deletePatrol(req.params.id);
    if (!deletedPatrol)
      return res.status(404).json({ error: "Patrol not found" });
    res.json({ message: "Patrol deleted successfully" });
  } catch (err) {
    next(err);
  }
};
