import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "kopycrazys@gmail.com",
        pass: "fnvcwspfjefvficw",
    }

})


export function sendEmails(email,param,nombre,tokensEmail,tokenEmail,tokenEmails){
    //correos de registro;
    if(param==1){
        transporter.sendMail({
            from: 'kopycrazys@gmail.com',
            to: email,  
            subject: 'Perfil Registro',
            html:'<h1>SU REGISTRO FUE EXITOSO</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p><b>' + nombre + '</b> ,El presente correo es para informar que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy  crazy fruit</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web</p>',
        }).then((res) => {
            console.log(res);
           
           
        }
        ).catch((err) => {
            console.log(err);
       
        }
        );
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