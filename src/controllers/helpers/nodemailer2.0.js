import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_USER,
} from "../../../config.js";

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});


export function EmailSend(
    email,
    param,
    nombre,
    amount
) {
     if (param == 7) {
        transporter
        .sendMail({
          from: "kopycrazys@gmail.com",
          to: email,
          subject: "COMPRA EXITOSA",
          html:"¡Gracias por tu compra "+nombre+"! Queríamos expresar nuestro agradecimiento por elegir nuestros productos. Su pago fue de:"+amount})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      }
}


