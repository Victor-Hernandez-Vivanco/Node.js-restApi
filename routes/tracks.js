const express = require("express");
const router = express.Router();
const customheder = require("../middleware/customHeader")
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/tracks")

// http://localhost:3001/api/tracks [GET, POST, PUT, DELETE]

// Crea un registro
router.post("/", validatorCreateItem, createItem)

// Lista los registros
router.get("/", getItems)

// Obtien los detalles de un item
router.get("/:id", validatorGetItem, getItem)

// Actualiza un registro
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem)

// Elimina un registro
router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router;
