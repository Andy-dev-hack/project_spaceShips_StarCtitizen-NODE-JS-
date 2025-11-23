import { check } from "express-validator";
import { validateResult } from "./validateResult.js";

export const validateRegister = [
  check("username")
    .exists()
    .withMessage("Username is required")
    .notEmpty()
    .withMessage("Username cannot be empty"),
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),
  check("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateLogin = [
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),
  check("password").exists().withMessage("Password is required"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
