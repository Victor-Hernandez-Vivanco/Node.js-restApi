const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

/**
 * Metodo para validar el registro de usuario nuevo
 */
const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("age").exists().notEmpty().isNumeric(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("email").exists().notEmpty().isEmail(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

/**
 * Metodo para validar el login del usuario
 */
const validatorLogin = [
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
  check("email").exists().notEmpty().isEmail(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin };
