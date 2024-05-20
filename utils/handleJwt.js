const jwt = require("jsonwebtoken");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const tokenSign = async (user, JWT_SECRET) => {
  const sign = jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return sign;
};

const verifyToken = async (tokenJwt, JWT_SECRET) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
