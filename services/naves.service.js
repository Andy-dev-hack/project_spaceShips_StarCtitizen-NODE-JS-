import { Nave } from "../models/naves.model.js";

/**
 * Gets all ships with pagination and filtering.
 */
export const getAllNaves = async (query = {}) => {
  const { page = 1, limit = 10, ...filters } = query;
  const skip = (page - 1) * limit;

  // Basic filtering (e.g., ?size=Large)
  // You can add more complex filtering logic here if needed

  const naves = await Nave.find(filters)
    .skip(parseInt(skip))
    .limit(parseInt(limit));

  const total = await Nave.countDocuments(filters);

  return {
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
    data: naves,
  };
};

/**
 * Creates a new ship.
 */
export const createNave = (naveData) => Nave.create(naveData);

/**
 * [NEW FUNCTION] Updates 'calidad' property to true
 * for all ships that currently do NOT have that property defined.
 * This is done by searching for 'calidad' field with null/undefined value.
 - An object with operation result (nModified, nMatched).
 */
export const setCalidadNaves = async () => {
  // Filter searches for all documents where 'calidad' key does not exist (or is null/undefined).
  const filter = { calidad: { $exists: false } };

  // Update uses $set operator to set 'calidad' value to true.
  const update = { $set: { calidad: true } };

  // Execute massive update operation.
  return Nave.updateMany(filter, update);
};
