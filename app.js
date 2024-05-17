require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const loggerStream = require("./utils/handleLoger");
const dbConnect = require("./config/mongo");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

// Este metodo es para trabajar en la consola solamente
morganBody(app, {
  
});


// -----------------------------//
/**
 * Esta seccion es para enviar el mensaje de error directo al Slack o cualquier otro sistema 
 * como por ejemplo canal de telegra, estc.
 */

// morganBody(app, {
//   noColors: true, // quitamos el color para que se envie a slak sin color
//   stream: loggerStream, // le pasamos el loggerStream al morganBody para que lo envie a slak
//   skip : function (req, res) {
//     return res.statusCode < 400 // si la consulta no tiene error, omitira el envio al slack, ya que solo debe enviar errores para eso eso avisar en caso de errores 
//   }
// });

const port = process.env.PORT || 3000;

// aqui invocamos a las rutas

app.use("/api", require("./routes"))

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

dbConnect();