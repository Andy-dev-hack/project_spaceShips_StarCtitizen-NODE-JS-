import { Patrol } from "../models/patrol.model.js";

export const getAllPatrols = async (query = {}) => {
  const { page = 1, limit = 10, ...filters } = query;
  const skip = (page - 1) * limit;

  const patrols = await Patrol.find(filters)
    .skip(parseInt(skip))
    .limit(parseInt(limit));

  const total = await Patrol.countDocuments(filters);

  return {
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
    data: patrols,
  };
};

export const createPatrol = (patrolData) => Patrol.create(patrolData);

export const updatePatrol = (id, updateData) =>
  Patrol.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

export const getPatrolById = (id) => Patrol.findById(id);

export const deletePatrol = (id) => Patrol.findByIdAndDelete(id);

export const findPatrolsByCrewRequirement = (crewSize) => {
  return Patrol.find({
    minCrew: { $lte: crewSize },
    recomendedCrew: { $gte: crewSize },
  });
};
