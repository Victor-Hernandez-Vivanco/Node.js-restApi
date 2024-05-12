const mongoose = require("mongoose");

// http://localhost/tracks

const TracksScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: Number
        },
        cover: {
            type: String,
            validator: (req) => {
                return true;
            },
            message:"ERROR_URL"
        },
        artist: {
            name: {
            type: String
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            },
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: String
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true, // registra la fecha de create y update
        versionKey:false
    }
)

module.exports = mongoose.model("tracks", TracksScheme)// se exporta el modelo de mongoose que contiene la tabla users