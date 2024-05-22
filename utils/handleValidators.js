const { validationResult } = require("express-validator");

/**
 * Este metodo valida la info de la solicitud x
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(403);
    res.send({ errors: error.array() });
  }
};

module.exports = validateResults;
