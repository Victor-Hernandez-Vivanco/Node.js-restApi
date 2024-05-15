const {handleHttpError} = require("../utils/handleError")


// Array con los roles permitidos
const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const rolesByUser = user.role; // devuelve ["user"]
        // TODO: ["admin","users"] 
        const checkValueRol = roles.some((roleSingle) => rolesByUser.includes(roleSingle)); // retiorna true o false
        if (!checkValueRol) {
            handleHttpError(res, "USER_NOT_PERMISSIONS", 403)
            return;
        }
        next();
        
    } catch (error) {
        handleHttpError(res, "ERROR_PEMISSIONS", 403);
    }
};
 
module.exports = checkRol;