const { matchedData } = require('express-validator');
const { tracksModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

// insertar un registro
const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await tracksModel.create(body);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ITEMS")
    }
}; 

// obtine la lista de los registros
const getItems = async (req, res) => {
    try {
        const data = await tracksModel.find({})
        res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
}; 

// obtener un registro por su id
const getItem = async (req, res) => {

    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.findById(id);
        res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}; 

// actualiza un registro 
const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(
            { _id: id }, body
        );
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_ITEMS")
        console.log(error)
    }
}; 

// eliminar un registro
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.delete({_id:id});
        res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}; 

module.exports = {getItems, getItem, createItem, updateItem, deleteItem }