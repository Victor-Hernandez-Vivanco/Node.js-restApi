const mongoose = require("mongoose");

const dbConnectNoSql = async () => {
  try {
    const DB_URI = process.env.DB_URI;
    await mongoose.connect(DB_URI);
    console.log("MONGO_CONEXION_READY");
  } catch (error) {
    console.error("MONGO_ERROR_CONEXION", error);
  }
};

module.exports = dbConnectNoSql;
