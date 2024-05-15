const bcryptjs = require("bcryptjs");

const encrypt = async (passwordPlain) => { // encripta la passwor en en un hash
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash;
};

// pasar contraseña sin encripta y contraseña encriptada
const compare = async (passwordPlain, hashPassword) => { // compara el hash con la clave 
    return await bcryptjs.compare(passwordPlain, hashPassword)
};

module.exports = { encrypt, compare };