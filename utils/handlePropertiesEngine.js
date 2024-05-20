/**
 * Normalizamos que todos los id sean del tipo id
 * ya que en mongo es _id y en mysql es id
 * para evitar conflictos se debe normalizar por id
 */

const ENGINE_DB = process.env.ENGINE_DB;
const getProperties = () => {
  const data = {
    nosql: {
      id: "_id",
    },
    mysql: {
      id: "id",
    },
  };
  return data[ENGINE_DB];
};

module.exports = getProperties;
