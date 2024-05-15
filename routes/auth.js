const express = require("express");
const { loginCtrl, registerCtrl } = require("../controllers/auth");
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");

// http://localhost:3001/api/auth/register

// Crea un registro
router.post("/register", validatorRegister, registerCtrl );


// http://localhost:3001/api/auth/login
router.post("/login", validatorLogin, loginCtrl );

module.exports = router;
