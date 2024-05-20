const { matchedData } = require("express-validator");
const { tokenSign, verifyToken } = require("../utils/handleJwt");
const { encrypt, compare, hashPassword } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

// http://localhost:3001/api/auth/register

// Controlador para registrar un nuevo usuario
const registerCtrl = async (req, res) => {
  try {
    // Obtener los datos validados del cuerpo de la solicitud
    const userData = matchedData(req);

    // Encriptar la contraseña proporcionada por el usuario
    const hashedPassword = await encrypt(userData.password);

    // Crear un nuevo objeto de usuario con la contraseña encriptada
    const newUser = {
      name: userData.name,
      age: userData.age,
      email: userData.email,
      password: hashedPassword, // Asignar la contraseña encriptada
      role: "user", // Opcional: asignar un rol por defecto
    };

    // Crear el usuario en la base de datos
    const createdUser = await usersModel.create(newUser);

    // Eliminar el campo de contraseña del usuario antes de enviar la respuesta
    createdUser.password = undefined;

    // Generar un token de autenticación para el nuevo usuario
    const token = await tokenSign(createdUser, JWT_SECRET);

    // Enviar la respuesta con el token y los datos del usuario creado
    res.json({ token, user: createdUser });
  } catch (error) {
    console.error("Error en el registro:", error);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

// Controlador para logear a un usuario
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password name role email"); // cuando se conecte a mysql hay que bloquear esta linea de codigo
    if (!user) {
      handleHttpError(res, "USER_NOT_EXIST", 404);
      return;
    }

    const hashPassword = user.get("password");
    if (!req.password || !hashPassword) {
      handleHttpError(res, "INVALID_DATA", 400);
      return;
    }

    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    user.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(user, JWT_SECRET),
      user,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerCtrl, loginCtrl };
