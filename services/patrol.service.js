import { Patrol } from "../models/patrol.model.js";

export const getAllPatrols = () => Patrol.find();

export const createPatrol = (patrolData) => Patrol.create(patrolData);

export const updatePatrol = (id, updateData) =>
  Patrol.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
