const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Storage = sequelize.define(
  "storages",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Storage;
