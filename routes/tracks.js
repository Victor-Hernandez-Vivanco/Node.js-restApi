const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");

// http://localhost:3001/api/tracks [GET, POST, PUT, DELETE]

// Crea un registro
router.post(
  "/",
  authMiddleware,
  checkRol(["user", "admin"]),
  validatorCreateItem,
  createItem
);

// Lista todos los registros
router.get("/", authMiddleware, checkRol(["user", "admin"]), getItems);

// Obtien los detalles de un item
router.get(
  "/:id",
  authMiddleware,
  checkRol(["user", "admin"]),
  validatorGetItem,
  getItem
);

// Actualiza un registro
router.put(
  "/:id",
  authMiddleware,
  checkRol(["user", "admin"]),
  validatorGetItem,
  validatorCreateItem,
  updateItem
);

// Elimina un registro
router.delete(
  "/:id",
  authMiddleware,
  checkRol(["user", "admin"]),
  validatorGetItem,
  deleteItem
);

module.exports = router;
