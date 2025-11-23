import { check } from "express-validator";
import { validateResult } from "./validateResult.js";

export const validateCreateNave = [
  check("name")
    .exists()
    .withMessage("Name is required")
    .notEmpty()
    .withMessage("Name cannot be empty"),
  check("price").optional().isNumeric().withMessage("Price must be a number"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
