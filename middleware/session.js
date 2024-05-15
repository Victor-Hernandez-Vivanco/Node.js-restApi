const {handleHttpError} = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const {usersModel} = require("../models")

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "TOKEN_NOT_EXIST", 401);
            return
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token, JWT_SECRET);

        if (!dataToken || !dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return
        } 

        const user = await usersModel.findById(dataToken._id);
        req.user = user
        
        next(); 
    
    } catch (error) {
        handleHttpError(res, "SESSION_NOT_VALID", 401);
    }
};

module.exports = authMiddleware