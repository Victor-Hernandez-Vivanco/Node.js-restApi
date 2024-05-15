const mongoose = require("mongoose");
const SoftDeleteModel = require("mongoose-delete");

const TracksScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
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

TracksScheme.plugin(SoftDeleteModel, { overrideMethods: 'all'});
module.exports = mongoose.model("tracks", TracksScheme);// se exporta el modelo de mongoose que contiene la tabla users