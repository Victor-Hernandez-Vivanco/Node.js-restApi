const { Sequelize } = require("sequelize");

// declaramos las variables de conección
const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

// instanciamos la clase que hace la conección con el dialecto de MySql
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
});

// llamamos a la funion de conección
const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("MYSQL_CONEXION_READY");
  } catch (error) {
    console.log("MYSQL_ERROR_CONEXION", error);
  }
};

module.exports = { sequelize, dbConnectMySql };
