const mongoose = require("mongoose")

const TracksScheme = new mongoose.Schema(
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
            type: String
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

module.exports = mongoose.model("tracks", TracksScheme)// se exporta el modelo de mongoose que contiene la tabla users