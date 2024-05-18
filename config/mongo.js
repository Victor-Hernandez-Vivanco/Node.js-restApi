const mongoose = require("mongoose");

const dbConnectNoSql = async () => {
  try {
    const DB_URI = process.env.DB_URI;
    await mongoose.connect(DB_URI);
    console.log("Conexion Ready");
  } catch (error) {
    console.error("Error Conexion", error);
  }
};

module.exports = dbConnectNoSql;
