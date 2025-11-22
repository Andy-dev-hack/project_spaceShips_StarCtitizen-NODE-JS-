import { Nave } from "../model/naves.model.js";

/**
 * Obtiene todas las naves.
 *  Lista de naves.
 */
export const getAllNaves = () => Nave.find();

/**
 * Crea una nueva nave.
 */
export const createNave = (naveData) => Nave.create(naveData);

/**
 * [NUEVA FUNCIÓN] Actualiza la propiedad 'calidad' a true
 * para todas las naves que actualmente NO tengan esa propiedad definida.
 * Esto se hace buscando el campo 'calidad' con el valor null/undefined.
 - Un objeto con el resultado de la operación (nModified, nMatched).
 */
export const setCalidadNaves = async () => {
  // El filtro busca todos los documentos donde la clave 'calidad' no existe (o es null/undefined).
  const filter = { calidad: { $exists: false } };

  // El update utiliza el operador $set para establecer el valor de 'calidad' a true.
  const update = { $set: { calidad: true } };

  // Ejecutamos la operación de actualización masiva.
  return Nave.updateMany(filter, update);
};
