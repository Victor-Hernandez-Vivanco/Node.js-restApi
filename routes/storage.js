const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { validatorGetItem } = require("../validators/storage");
const { getItem, getItems,  deleteItem, createItem } = require("../controllers/storage");

//http://localhost:3001/api/storage [GET, POST, DELETE]

// Crea un item
router.post("/", uploadMiddleware.single("myfile"), createItem);

// Obtiene la laista de items
router.get("/", getItems)

//Obtiene el detalle de un item
router.get("/:id", validatorGetItem,  getItem);

// Elimina un item
router.delete("/:id", validatorGetItem, deleteItem);


module.exports = router;