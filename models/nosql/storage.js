const { mongoose } = require("mongoose")

const StorageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        filename: {
            type: Number,
        },
    },
    {
        timestamps: true, // registra el createAt y updateaAt
        versionKey:false
    }
)

module.exports = mongoose.model("storage", StorageSchema)// se exporta el modelo de mongoose que contiene la tabla storage