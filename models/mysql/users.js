const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
    },
    email: {
      type: DataTypes.STRING,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(["user", "admin"]),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
