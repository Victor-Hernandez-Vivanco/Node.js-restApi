const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next(); // si no hay error continua al controlador
    } catch (error) {
        res.status(403);
        res.send({ errors: error.array() }); // envia un mensaje con un array de los errores
    }
};

module.exports = validateResults