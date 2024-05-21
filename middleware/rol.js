const { handleHttpError } = require("../utils/handleError");

// Array con los roles permitidos
const checkRol = (rol) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({ user });

    const rolesByUser = user.role;
    //console.log({ rolesByUser });

    const checkValueRol = rol.some((roleSingle) =>
      rolesByUser.includes(roleSingle)
    );

    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }

    next();
  } catch (error) {
    handleHttpError(res, "ERROR_PEMISSIONS", 403);
  }
};

module.exports = checkRol;
