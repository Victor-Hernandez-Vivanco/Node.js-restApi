const mongoose = require("mongoose");

const dbConnectNoSql = async () => {
  try {
    const DB_URI = process.env.DB_URI;
    await mongoose.connect(DB_URI);
    console.log("MONGO CONECCION EXITOSA");
  } catch (error) {
    console.error("Error Conexion", error);
  }
};

module.exports = dbConnectNoSql;
