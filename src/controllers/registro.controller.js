import { pool } from "../db.js";
import nodemailer from "nodemailer";
import {
    USER_EMAIL,
    PASS_EMAIL,
    HOST_EMAIL,
    PORT_EMAIL,
} from "../config.js";


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
            host: HOST_EMAIL,
            port: PORT_EMAIL,
            auth: {
                user: USER_EMAIL,
                pass: PASS_EMAIL
            },
        });
        transporter;

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
    const email = req.body.email;
    try {
        const [rows] = await pool.query(`SELECT email FROM registro WHERE email = ?`, [email]);
        let tokenEmail = Math.floor(Math.random() * 100000);
        const transporter = nodemailer.createTransport({
            host: HOST_EMAIL,
            port: PORT_EMAIL,
            auth: {
                user: USER_EMAIL,
                pass: PASS_EMAIL
            },

        });

        const [rows2] = await pool.query(`UPDATE registro SET token = ? WHERE email = ?`, [tokenEmail, email]);

        const emailResult = await transporter.sendMail({
            from: 'kopycrazy@gmail.com',
            to: email,
            subject: 'Recuperar contraseña',
            html: '<h1>Recuperar contraseña</h1><p>Para recuperar su contraseña ingrese el siguiente codigo en la aplicacion web <b>Kopy  crazy fruit</b> ' + tokenEmail + '</p>',
        });
        console.log(emailResult);
        res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al enviar correo' });
    }
};

export const Verificar = async (req, res) => {
    const token = req.body.token;
    const password = req.body.password;
    try {
        const [rows] = await pool.query(`SELECT token FROM registro WHERE token = ?`, [token]);
        if (rows.length > 0) {
            const [rows2] = await pool.query(`UPDATE registro SET password = ? WHERE token = ?`, [password, token]);
            res.status(200).json({ message: "Contraseña actualizada" });
        }

        else {
            res.status(401).json({ message: "Codigo incorrecto" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error al verificar el codigo",
        })
    }

}

export const getRegistroAdmin = (req, res) => {
    res.send("Registro de Administrador")
}

export const postRegistroAdmin = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body
        const [rows] = await pool.query('INSERT INTO admin (nombre,apellido,email,password) VALUES (?,?,?,?)', [nombre, apellido, email, password])
        res.send(
            {
                nombre,
                apellido,
                email,
                password
            }
        )
        const transporter = nodemailer.createTransport({
            host: HOST_EMAIL,
            port: PORT_EMAIL,
            auth: {
                user: USER_EMAIL,
                pass: PASS_EMAIL
            },
        });
        transporter;
        transporter.sendMail({
            from: 'kopycrazy@gmail.com',
            to: email,
            subject: 'Administrador registrado',
            html: '<h1>SU REGISTRO FUE EXITOSO</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p><b>' + nombre + '</b> ,El presente correo es para informar que ha sido registrado(a) correctamente como administrador en nuestro aplicativo web <b>Kopy  crazy fruit</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web</p>'

        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    catch (error) {
        return res.status(500).json({
            message: "Error al crear el usuario",
        })
    }
}

export const loginAdminGet = async (req, res) => {
    res.send('Loguear admin')
}
export const loginAdminPost = async (req, res) => {
    try {
        const { email, password } = req.body
        const [rows2] = await pool.query('SELECT * FROM admin WHERE email= ? AND password= ?', [email, password])

        if (rows2.length > 0) {
            res.send('Administrador logueado')
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error al iniciar sesión",
        })
    }
}