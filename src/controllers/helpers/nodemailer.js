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

export function sendEmails(
  email,
  param,
  nombre,
  amount,
  tokensEmail,
  tokenEmail,
  tokenEmails
) {
  if (param === 1) {
    console.log("entro?");
    transporter
      .sendMail({
        from: "kopycrazys@gmail.com",
        to: email,
        subject: "Perfil Registro",
        html:
          '<div style="max-width: 1000px; width: 90%; margin: 0 auto; background-color: rgb(206, 236, 213); border-radius: 20px;"><div class="bg-dark" style="margin-top: 40px; padding: 20px 0; background-color: rgb(206, 236, 213); text-align: center;"><div class="alert alert-primary" style="font-family: Alkatra, cursive; color: #d56012; background-color: rgb(206, 236, 213); text-align: center;"><h1> REGISTRO EXITOSO</h1></div></div><div class="mensaje" style="width: 80%; font-size: 20px; margin: 0 auto 40px; color: #eee;"><img class="img" src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png" style="max-width: 100%; height: auto;"><p class="texto" style="margin-top: 20px; color: #343a40; font-family: Vesper Libre, serif;"><b>' +
          nombre +
          '</b>, El presente correo es para informarle que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy crazy fruit</b>. Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web.</p></div><div class="footer" style="width: 98%; background:rgb(71,59,59); text-align: center; color: #ddd; padding: 10px; font-size: 20px; font-family: Vesper Libre, serif; border-radius: 20px;"> Puedes llamar <span style="text-decoration: underline;">31736737282</span> o escribir a <span style="text-decoration: underline;">kopycrazys@gmail.com</span></div></div>',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error occurred: ", err);
      });
  } else if (param == 2) {
    transporter
      .sendMail({
        from: "kopycrazys@gmail.com",
        to: email,
        subject: "Recupera Contraseña ",
        html:
          '<div style="max-width: 1000px; width: 90%; margin: 0 auto; background-color: rgb(206, 236, 213); border-radius: 20px;"><div class="bg-dark" style="margin-top: 40px; padding: 20px 0; background-color: rgb(206, 236, 213); text-align: center;"><div class="alert alert-primary" style="font-family: Alkatra, cursive; color: #d56012; background-color: rgb(206, 236, 213); text-align: center;"><h1> REGISTRO EXITOSO</h1></div></div><div class="mensaje" style="width: 80%; font-size: 20px; margin: 0 auto 40px; color: #eee;"><img class="img" src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png" style="max-width: 100%; height: auto;"><p class="texto" style="margin-top: 20px; color: #343a40; font-family: Vesper Libre, serif;"><b>' +
          nombre +
          '</b>, El presente correo es para informarle que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy crazy fruit</b>. Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web.</p></div><div class="footer" style="width: 98%; background:rgb(71,59,59); text-align: center; color: #ddd; padding: 10px; font-size: 20px; font-family: Vesper Libre, serif; border-radius: 20px;"> Puedes llamar <span style="text-decoration: underline;">31736737282</span> o escribir a <span style="text-decoration: underline;">kopycrazys@gmail.com</span></div></div>',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (param == 3) {
    transporter
      .sendMail({
        from: "kopycrazys@gmail.com",
        to: email,
        subject: "factura ",
        html:
          '<div style="max-width: 1000px; width: 90%; margin: 0 auto; background-color: rgb(206, 236, 213); border-radius: 20px;"><div class="bg-dark" style="margin-top: 40px; padding: 20px 0; background-color: rgb(206, 236, 213); text-align: center;"><div class="alert alert-primary" style="font-family: Alkatra, cursive; color: #d56012; background-color: rgb(206, 236, 213); text-align: center;"><h1> REGISTRO EXITOSO</h1></div></div><div class="mensaje" style="width: 80%; font-size: 20px; margin: 0 auto 40px; color: #eee;"><img class="img" src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png" style="max-width: 100%; height: auto;"><p class="texto" style="margin-top: 20px; color: #343a40; font-family: Vesper Libre, serif;"><b>' +
          nombre +
          '</b>, El presente correo es para informarle que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy crazy fruit</b>. Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web.</p></div><div class="footer" style="width: 98%; background:rgb(71,59,59); text-align: center; color: #ddd; padding: 10px; font-size: 20px; font-family: Vesper Libre, serif; border-radius: 20px;"> Puedes llamar <span style="text-decoration: underline;">31736737282</span> o escribir a <span style="text-decoration: underline;">kopycrazys@gmail.com</span></div></div>',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //correos de recuperacion de contraseña
  } else if ((param = 4)) {
    transporter
      .sendMail({
        from: "kopycrazys@gmail.com",
        to: email,
        subject: "Recuperar contraseña",
        html:
          ' <div style="max-width: 1000px; width: 90%; margin: 0 auto; background-color: rgb(206, 236, 213); border-radius: 20px;"><div class="bg-dark" style="margin-top: 40px; padding: 20px 0; background-color: rgb(206, 236, 213); text-align: center;"><div class="alert alert-primary" style="font-family: Alkatra, cursive; color: #d56012; background-color: rgb(206, 236, 213); text-align: center;"><h1>Recuperar Contraseña</h1></div></div><div class="mensaje" style="width: 80%; font-size: 20px; margin: 0 auto 40px; color: #eee;"><img class="img" src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png" style="max-width: 100%; height: auto;"><p class="texto" style="margin-top: 20px; color: #343a40; font-family: Vesper Libre, serif;"><b>' +
          nombre +
          "</b>, El presente correo es para informarle que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy crazy fruit</b>.Para recuperar su contraseña ingrese el siguiente codigo en la aplicacion web <b>Kopy  crazy fruit</b> " +
          tokensEmail +
          '</p></div><div class="footer" style="width: 98%; background:rgb(71,59,59); text-align: center; color: #ddd; padding: 10px; font-size: 20px; font-family: Vesper Libre, serif; border-radius: 20px;"> Puedes llamar <span style="text-decoration: underline;">31736737282</span> o escribir a <span style="text-decoration: underline;">kopycrazys@gmail.com</span></div></div>',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (param == 5) {
    transporter
      .sendMail({
        from: "kopycrazys@gmail.com",
        to: email,
        subject: "Recuperar contraseña",
        html:
          ' <div style="max-width: 1000px; width: 90%; margin: 0 auto; background-color: rgb(206, 236, 213); border-radius: 20px;"><div class="bg-dark" style="margin-top: 40px; padding: 20px 0; background-color: rgb(206, 236, 213); text-align: center;"><div class="alert alert-primary" style="font-family: Alkatra, cursive; color: #d56012; background-color: rgb(206, 236, 213); text-align: center;"><h1>Recuperar Contraseña</h1></div></div><div class="mensaje" style="width: 80%; font-size: 20px; margin: 0 auto 40px; color: #eee;"><img class="img" src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png" style="max-width: 100%; height: auto;"><p class="texto" style="margin-top: 20px; color: #343a40; font-family: Vesper Libre, serif;"><b>' +
          nombre +
          "</b>, El presente correo es para informarle que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy crazy fruit</b>.Para recuperar su contraseña ingrese el siguiente codigo en la aplicacion web <b>Kopy  crazy fruit</b> " +
          tokensEmail +
          '</p></div><div class="footer" style="width: 98%; background:rgb(71,59,59); text-align: center; color: #ddd; padding: 10px; font-size: 20px; font-family: Vesper Libre, serif; border-radius: 20px;"> Puedes llamar <span style="text-decoration: underline;">31736737282</span> o escribir a <span style="text-decoration: underline;">kopycrazys@gmail.com</span></div></div>',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (param == 6) {
    transporter
      .sendMail({
        from: "kopycrazys@gmail.com",
        to: email,
        subject: "Recuperar contraseña",
        html:
          ' <div style="max-width: 1000px; width: 90%; margin: 0 auto; background-color: rgb(206, 236, 213); border-radius: 20px;"><div class="bg-dark" style="margin-top: 40px; padding: 20px 0; background-color: rgb(206, 236, 213); text-align: center;"><div class="alert alert-primary" style="font-family: Alkatra, cursive; color: #d56012; background-color: rgb(206, 236, 213); text-align: center;"><h1>Recuperar Contraseña</h1></div></div><div class="mensaje" style="width: 80%; font-size: 20px; margin: 0 auto 40px; color: #eee;"><img class="img" src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png" style="max-width: 100%; height: auto;"><p class="texto" style="margin-top: 20px; color: #343a40; font-family: Vesper Libre, serif;"><b>' +
          nombre +
          "</b>, El presente correo es para informarle que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy crazy fruit</b>.Para recuperar su contraseña ingrese el siguiente codigo en la aplicacion web <b>Kopy  crazy fruit</b> " +
          tokensEmail +
          '</p></div><div class="footer" style="width: 98%; background:rgb(71,59,59); text-align: center; color: #ddd; padding: 10px; font-size: 20px; font-family: Vesper Libre, serif; border-radius: 20px;"> Puedes llamar <span style="text-decoration: underline;">31736737282</span> o escribir a <span style="text-decoration: underline;">kopycrazys@gmail.com</span></div></div>',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });


      
  }else if (param == 7) {
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