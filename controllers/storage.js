// const fs = require("fs"); // spara eñiminar de forma permanente un registro
const { matchedData } = require('express-validator');
const { storageModel } = require('../models');
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;


// insertar un registro
const createItem = async (req, res) => {
    try {
        const { file } = req
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ITEM");
    }
}; 

// obtine la lista de los registros
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_LIST_ITEMS");
    }
}; 

// obtener un registro por su id
const getItem = async (req, res) => { 
    try {                               
        const { id } = matchedData(req)
        const data = await storageModel.findById(id);
        res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_DETAIL_ITEM");
    }
}; 

// eliminar un registro por su id
const deleteItem = async (req, res) => {
     try {                              
        const { id } = matchedData(req)
         const datafile = await storageModel.findById(id);
         await storageModel.delete({_id:id})
         // await storageModel.deleteOne(id) spara eliminar de forma permanente un registro
        const { filename } = datafile;
        const filePath = `${MEDIA_PATH}/${filename}`
        
        // fs.unlinkSync(filePath); // espara eliminar de forma permanente un registro
        const data = {
            filePath,
            deleted:1
        }
         res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
}; 

module.exports = {getItems, getItem, createItem, deleteItem }