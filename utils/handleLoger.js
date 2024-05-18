/**
 * Esta seccion es para enviar el mensaje de error directo al Slack o cualquier otro sistema 
 * como por ejemplo canal de telegram, estc.
 */

const { IncomingWebhook } = require("@slack/webhook"); // paquete que crea la conección

const webHook = new IncomingWebhook (process.env.SLACK_WEHOOK) // instanciamos la url del slack


// con este metodo le decimos a la app que envie el dato a slak
const loggerStream = {
  write: message => { // message contien el LOG
    webHook.send({
      text:message
    })
    console.log("Capturando el LOG -> ", message);
  },
};

module.exports = loggerStream