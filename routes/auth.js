const express = require("express");
const router = express.Router();
const {encrypt, compare} = require("../utils/handlePassword")
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { matchedData } = require("express-validator");
const { usersModel } = require("../models");


// http://localhost:3001/api/auth/login
// http://localhost:3001/api/auth/register

// Crea un registro
router.post("/register", validatorRegister ,async (req, res) => {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const data = await usersModel.create(body); // hace que no se muestre la clave encriptada
    data.set("password", undefined, { strict: false });
    res.send({ data });
});

// // Lista los registros
// router.get("/", getItems)

// // Obtien los detalles de un item
// router.get("/:id", validatorGetItem, getItem)

// // Actualiza un registro
// router.put("/:id", validatorGetItem, validatorCreateItem, updateItem)

// // Elimina un registro
// router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router;
