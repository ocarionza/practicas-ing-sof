/* Importacion de librerias */
const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./src/middlewares/handlers/errors.handlers');

/* importacion de rutas del proyceto*/
const routerApi = require('./src/routes');
const port = process.env.PORT;
const app = express();

/* activacion del puerto */
app.listen(port, () => console.log('Listen port', port));

/* conectamos con la base de datos */
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Succes connection with mongo'))
  .catch(() => console.error('Connection could not be established'));

/* creacion de middleware*/
app.use(express.json());
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

// ================ Twilio SMS ========================
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = new twilio(accountSID, authToken);

/* Enviar mensaje */

client.messages
  .create({
    body: 'Hello my name is brayan, welcome to twilio',
    from: '+12078433114', // From a valid Twilio number
    to: '+573132515410', // Text this number
  })
  .then((message) => console.log(`mensaje enviado ${message.sid}`))
  .catch((err) => console.log(err));

// ===================== SENDGRID ==============================
const email = require('./src/services/sendgrid/email');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.json({ message: 'Success' });
});

/* http://localhost:3000/api/email/confirmation */
app.post('/api/email/confirmation', async (req, res, next) => {
  try {
    res.json(await email.sendOrder(req.body));
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

routerApi(app);