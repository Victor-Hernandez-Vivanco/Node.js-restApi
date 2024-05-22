const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

// insertar un registro
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM_TRACKS");
  }
};

// // obtener todos los registros
const getItems = async (req, res) => {
  try {
    const user = req.user; // user del midleware session, es decir del usuario que esta logeado haciendo la solicitud
    console.log("Este es el user -> ", user);
    const data = await tracksModel.findAllData({}); // Llama al método findAllData para obtener los elementos
    console.log("Esta es la data -> ", data);
    res.send({ data, user });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS_TRACKS");
  }
};

// Obtener un registro por su id
const getItem = async (req, res) => {
  try {
    const user = req.user; // user del midleware session, es decir del usuario que esta logeado haciendo la solicitud
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findOneData({ id });
    console.log("esta es la data -> ", data);
    res.send({ data, user });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM_TRACKS");
  }
};

// actualiza un registro
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate({ _id: id }, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS_TRACKS");
    console.log(error);
  }
};

// eliminar un registro
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.delete({ _id: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM_TRACKS");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
