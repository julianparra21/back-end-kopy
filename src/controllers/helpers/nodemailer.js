import nodemailer from 'nodemailer';
import fs from 'fs';



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'kopycrazys@gmail.com',
    pass: 'fnvcwspfjefvficw',
  },
});

export function sendEmails(email, param, nombre, tokensEmail, tokenEmail, tokenEmails) {
  
  if (param === 1) {
    console.log("entro?");
    transporter.sendMail({
        from: 'kopycrazys@gmail.com',
        to: email,
        subject: 'Perfil Registro',
        html: '<div style="max-width: 1000px; width: 90%; margin: 0 auto; background-color: rgb(206, 236, 213); border-radius: 20px;"><div class="bg-dark" style="margin-top: 40px; padding: 20px 0; background-color: rgb(206, 236, 213); text-align: center;"><div class="alert alert-primary" style="font-family: Alkatra, cursive; color: #d56012; background-color: rgb(206, 236, 213); text-align: center;"><h1>SU REGISTRO FUE EXITOSO</h1></div></div><div class="mensaje" style="width: 80%; font-size: 20px; margin: 0 auto 40px; color: #eee;"><img class="img" src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png" style="max-width: 100%; height: auto;"><p class="texto" style="margin-top: 20px; color: #343a40; font-family: Vesper Libre, serif;"><b>' + nombre + '</b>, el presente correo es para informarle que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy crazy fruit</b>. Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web.</p></div><div class="footer" style="width: 98%; background:rgb(71,59,59); text-align: center; color: #ddd; padding: 10px; font-size: 20px; font-family: Vesper Libre, serif; border-radius: 20px;"> Puedes llamar <span style="text-decoration: underline;">31736737282</span> o escribir a <span style="text-decoration: underline;">kopycrazys@gmail.com</span></div></div>'
    }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log('Error occurred: ', err);
      });
    }else if(param==2){
        transporter.sendMail({
            from: 'kopycrazys@gmail.com',
            to: email,  
            subject: 'Recupera Contraseña ',
            html: '<h1>SU REGISTRO FUE EXITOSO</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p><b>' + nombre + '</b> ,El presente correo es para informar que ha sido registrado(a) correctamente en nuestro aplicativo web  como Administrador<b>Kopy  crazy fruit</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web</p>',
        }).then((res) => {
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    }else if(param==3){
        transporter.sendMail({
            from: 'kopycrazys@gmail.com',
            to: email,  
            subject: 'factura ',
            html:'<h1>SU REGISTRO FUE EXITOSO</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p><b>' + nombre + '</b> ,El presente correo es para informar que ha sido registrado(a) correctamente en nuestro aplicativo web  como domiciliario<b>Kopy  crazy fruit</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web</p>',
        }).then((res) => {
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        }
        ); 

        //correos de recuperacion de contraseña

    }else if(param=4){
       
         transporter.sendMail({
            from: 'kopycrazys@gmail.com',
            to: email,
            subject: 'Recuperar contraseña',
            html: '<h1>Recuperar contraseña</h1><p>Para recuperar su contraseña ingrese el siguiente codigo en la aplicacion web <b>Kopy  crazy fruit</b> ' + tokensEmail + '</p>',
        }).then((res) => {
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        }
        ); 
    }else if(param==5){
        transporter.sendMail({
            from: 'kopycrazys@gmail.com',
            to: email,
            subject: 'Recuperar contraseña',
            html: '<h1>Recuperar contraseña</h1><p>Para recuperar su contraseña ingrese el siguiente codigo en la aplicacion web <b>Kopy  crazy fruit</b> ' + tokenEmail + '</p>',
        }).then((res) => {
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        }
        ); 
    }else if(param==6){
        transporter.sendMail({
            from: 'kopycrazys@gmail.com',
            to: email,
            subject: 'Recuperar contraseña',
            html: '<h1>Recuperar contraseña</h1><p>Para recuperar su contraseña ingrese el siguiente codigo en la aplicacion web <b>Kopy  crazy fruit</b> ' + tokenEmails + '</p>',
        }).then((res) => {
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        }
        ); 

}
}
