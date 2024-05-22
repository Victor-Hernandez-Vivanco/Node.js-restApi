const mongoose = require("mongoose");
const SoftDeleteModel = require("mongoose-delete");

const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => true,
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: String,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true, // registra la fecha de create y update
    versionKey: false,
  }
);

/**
 * Este metodo hace una relacion para que vengan
 * todos los datos, incluyendo la url del archivo
 * @returns
 */
TracksScheme.statics.findAllData = function () {
  const joinData = this.aggregate([
    // modelo padre tracks
    {
      $lookup: {
        from: "storages", // desde el modelo padre se hace una relacion con storages
        localField: "mediaId", // donde en el padre se utiliza mediaId
        foreignField: "_id", // que lo relaciona con storage _id
        as: "audio", // todo el resultado que consiga lo guarda en un alias llamado audio
      },
    },
    {
      $unwind: "$audio",
    },
  ]);
  return joinData;
};

/**
 * Metodo por ID
 * Este metodo trae un archivo por su id,
 * incluyendo su url
 * @returns
 */
TracksScheme.statics.findOneData = function (id) {
  return this.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) }, // mongoose.Types.ObjectId(id) pronto quedara obsoleto OJO
    },
    {
      $lookup: {
        from: "storages",
        localField: "mediaId",
        foreignField: "_id",
        as: "audio",
      },
    },
    { $unwind: "$audio" },
  ]);
};

TracksScheme.plugin(SoftDeleteModel, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TracksScheme); // se exporta el modelo de mongoose que contiene la tabla users
