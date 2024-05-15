const bcryptjs = require("bcryptjs");

/**
 * Función para encriptar la contraseña.
 * @param {string} passwordPlain - Contraseña sin encriptar.
 * @returns {Promise<string>} - Contraseña encriptada.
 */
const encrypt = async (passwordPlain) => {
    try {
        const hash = await bcryptjs.hash(passwordPlain, 10);
        return hash;
    } catch (error) {
        throw new Error('Error en la encriptación de la contraseña.');
    }
};

/**
 * Función para comparar una contraseña en texto plano con un hash de contraseña encriptada.
 * @param {string} passwordPlain - Contraseña en texto plano.
 * @param {string} hashPassword - Hash de la contraseña encriptada.
 * @returns {Promise<boolean>} - Verdadero si las contraseñas coinciden, falso si no.
 */
const compare = async (passwordPlain, hashPassword) => {
    try {
        const match = await bcryptjs.compare(passwordPlain, hashPassword);
        return match;
    } catch (error) {
        throw new Error('Error al comparar las contraseñas.');
    }
};

module.exports = { encrypt, compare };
