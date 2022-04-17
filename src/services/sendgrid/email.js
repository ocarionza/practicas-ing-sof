const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailConfirmationHTML(customerName, orderNro) {
  return `<!DOCTYPE html>
	<html lang="en">
	<head>
  <style>
  img {
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 5px;
    max-width: 90%;
    height: auto;
  }
  </style>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE-edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		<div class="container section">
			<h1 align="center">Resumen de su compra</h1>
      <h2 align="left">Lista de videojuegos: </h2>
			<img src="https://cdn1.epicgames.com/3328b08ac1c14540aa265a1a85c07839/offer/hzd_wide-2560x1440-bd312be05c49cf339097777c493cb899.jpg">
			<img src="https://i.blogs.es/493cfd/1366_2000/1366_2000.jpeg">
		</div>
	</body>
	</html>`;
}

function getMessage(emailParams) {
  return {
    to: emailParams.toEmail,
    from: 'zajoseza@gmail.com',
    subject: 'Confirmación orden de compra Black Friday',
    text: `Hola ${emailParams.customerName}, te enviamos las imagenes de los productos comprados y la factura con número ${emailParams.orderNro}. Gracias por tu compra`,
    html: sendEmailConfirmationHTML(
      emailParams.customerName,
      emailParams.orderNro
    ),
  };
}

async function sendOrder(emailParams) {
  try {
    await sgMail.send(getMessage(emailParams));
    return { message: 'Confirmación de compra enviada' };
  } catch (err) {
    const message = 'No se pudo enviar la orden de compra. Valide los errores';
    console.error(message);
    console.error(err);
    if (err.response) console.error(err.response.body);
    return { message };
  }
}

module.exports = { sendOrder };
