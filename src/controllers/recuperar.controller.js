import { pool } from "../db.js";
import nodemailer from "nodemailer";

export const RecuperarGet = (req, res) => {
    res.send("Recuperar contraseña")
}



export const RecuperarPost = async (req, res) => {
    const email = req.body.email;
    try {
        const [rows] = await pool.query(`SELECT email FROM registro WHERE email = ?`, [email]);
        let tokenEmail = Math.floor(Math.random() * 100000);
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: 'kopycrazy@gmail.com',
                pass: 'rcyxbrlzopvcmaks'
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

            const { email } = req.body;
            const [rows] = await pool.query('SELECT * FROM registro WHERE email = ?', [email]);

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

export const RecuperarAdminGet = (req, res) => {

    res.send("Recuperar contraseña")
}

export const RecuperarAdminPost = async (req, res) => {
    const email = req.body.email;
    try {
        const [rows] = await pool.query(`SELECT email FROM admin WHERE email = ?`, [email]);
        let tokenEmail = Math.floor(Math.random() * 100000);
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: 'kopycrazy@gmail.com',
                pass: 'rcyxbrlzopvcmaks',
            },

        }); 
        const [rows2] = await pool.query(`UPDATE admin SET token = ? WHERE email = ?`, [tokenEmail, email]);

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

export const VerificarAdmin = async (req, res) => {
    const token = req.body.token;
    const password = req.body.password;

    try {
        const [rows] = await pool.query(`SELECT token FROM admin WHERE token = ?`, [token]);
        if (rows.length > 0) {
            const [rows2] = await pool.query(`UPDATE admin SET password = ? WHERE token = ?`, [password, token]);
            res.status(200).json({ message: "Contraseña actualizada" });

            const { email } = req.body;
            const [rows] = await pool.query('SELECT * FROM admin WHERE email = ?', [email]);

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