const express = require("express");
const router = express.Router();
const checkRol = require("../middleware/rol");
const authMiddleware = require("../middleware/session");
const uploadMiddleware = require("../utils/handleStorage");
const { validatorGetItem } = require("../validators/storage");
const {
  getItem,
  getItems,
  deleteItem,
  createItem,
} = require("../controllers/storage");

//http://localhost:3001/api/storage [GET, POST, DELETE]

// Crea un item
router.post(
  "/",
  uploadMiddleware.single("myfile"),
  authMiddleware,
  checkRol(["admin"]),
  createItem
);

// Obtiene la laista de items
router.get("/", authMiddleware, checkRol(["admin"]), getItems);

//Obtiene el detalle de un item
router.get(
  "/:id",
  authMiddleware,
  checkRol(["user"]),
  validatorGetItem,
  getItem
);

// Elimina un item
router.delete(
  "/:id",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetItem,
  deleteItem
);

module.exports = router;
