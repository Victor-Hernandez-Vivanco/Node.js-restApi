const mongoose = require("mongoose");
const SoftDeleteModel = require("mongoose-delete");

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique:true
        },
        pasword: {
            type: String,
            select:false
        },
        role: {
            type: ["user", "admin"],
            default:"user",
        },
    },
    {
        timestamps: true, // registra la fecha de create y update
        versionKey:false
    }
)
UserScheme.plugin(SoftDeleteModel, { overrideMethods: 'all'});
module.exports = mongoose.model("users", UserScheme);// se exporta el modelo de mongoose que contiene la tabla users