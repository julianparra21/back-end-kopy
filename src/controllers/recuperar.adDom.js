import { pool } from "../db.js";

import { sendEmails } from "./helpers/nodemailer.js";


//recuperar contraseña administrador
export const RecuperarAdminGet = (req, res) => {
    
        res.send("Recuperar contraseña")
    }

export const RecuperarAdminPost2 = async (req, res) => {
    const email = req.body.email;
    try {
        const [rows] = await pool.query(`SELECT email_admin FROM administrador WHERE email_admin = ?`, [email]);
        
        let tokensEmail = Math.floor(Math.random() * 100000);
        const [rows2] = await pool.query(`UPDATE administrador SET token_admin = ? WHERE email_admin = ?`, [tokensEmail, email]);

        await sendEmails(email,tokensEmail, 4,tokensEmail);
       
    
        res.status(200).json({ message: 'Correo recu enviado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al enviar correo' });
    }
};

export const VerificarAdmin2 = async (req, res) => {
    const token = req.body.token;
    const password = req.body.password;

    try {
        const [rows] = await pool.query(`SELECT token_admin FROM administrador WHERE token_admin = ?`, [token]);
        if (rows.length > 0) {
            const [rows2] = await pool.query(`UPDATE administrador SET password_admin = ? WHERE token_admin = ?`, [password, token]);
            res.status(200).json({ message: "Contraseña actualizada" });

            const { email } = req.body;
            const [rows] = await pool.query('SELECT * FROM administrador WHERE email_admin = ?', [email]);

        }

        else {
            res.status(401).json({ message: "Codigo invalido" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error al verificar el codigo",
        })
    }

}


