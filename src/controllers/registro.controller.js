import { pool } from "../db.js";
import nodemailer from "nodemailer";



export const getRegistro = (req, res) => {
    res.send("Registro de usuarios")
}

export const postRegistro = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body
        const [rows] = await pool.query('INSERT INTO registro (nombre,apellido,email,password) VALUES (?,?,?,?)', [nombre, apellido, email, password])
        res.send(
            {
                nombre,
                apellido,
                email,
                password
            }
        )
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: "kopycrazy@gmail.com",
              pass: "rcyxbrlzopvcmaks",
            }
            
        });

        transporter.sendMail({
            from: 'kopycrazy@gmail.com',
            to: email,
            subject: 'Registro exitoso',
            html: '<h1>SU REGISTRO FUE EXITOSO</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p><b>' + nombre + '</b> ,El presente correo es para informar que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy  crazy fruit</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web</p>',
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });




    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el usuario", 
        })
    }

}

export const LoginGet = (req, res) => {
    res.send("login de usuarios")
}

export const LoginPost = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM registro WHERE email = ? AND password = ?', [email, password]);

        if (rows.length > 0) {
            // Usuario encontrado en la base de datos, se inicia sesión
            res.send("Bienvenido al sitio");
        } else {
            // Usuario no encontrado en la base de datos
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error al iniciar sesión",
        })
    }
}


export const RecuperarGet = (req, res) => {
    res.send("Recuperar contraseña")
}



export const RecuperarPost = async (req, res) => {
    try {
        const { email } = req.body;
        const [rows] = await pool.query('SELECT * FROM registro WHERE email = ?', [email]);

        if (rows.length > 0) {
            // Usuario encontrado en la base de datos, se inicia sesión
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: "kopycrazy@gmail.com",
                pass: "rcyxbrlzopvcmaks",
                },
            });
            transporter;

            transporter.sendMail({
                    
                    from:'kopycrazy@gmail.com',
                    to: email,
                    subject: 'Recuperar contraseña',
                    html: '<h1>RECUPERAR CONTRASEÑA</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p>Para recuperar su contraseña haga click en el siguiente enlace <a href="http://localhost:3000/recuperar">Recuperar contraseña</a></p>',
                }).then((res) => {
                    console.log(res);
                }
                ).catch((err) => {
                    console.log(err);
                }
                ).then((res) => {
                    console.log(res);
                }
                ).catch((err) => {
                    console.log(err);
                }
                );
            res.send("Se ha enviado un correo a su cuenta de correo electronico");
        } else {
            // Usuario no encontrado en la base de datos
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error al iniciar sesión",
        })
    }
            

}