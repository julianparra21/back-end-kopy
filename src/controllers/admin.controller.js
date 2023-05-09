import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";

import { sendEmails } from "./helpers/nodemailer.js";


//registro admin

export const registroAdminGet = (req, res) => {
    res.send("Registro de administradores")
}

export const registroAdminPost = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body

        if ([nombre,apellido,email,password].some(field=>!field)) {
            return res.status(404).json({
                message: "Por favor complete todos los campos"
            })
            
            
        }
        

        const saltAdmin = 10;
        const hashedPasswordAdmin = await bcrypt.hash(password, saltAdmin);
        const [rows] = await pool.query('INSERT INTO administrador (nombre_admin,apellido_admin,email_admin,contraseña_admin) VALUES (?,?,?,?)', [nombre, apellido, email, hashedPasswordAdmin])
        res.send(
            {
                nombre,
                apellido,
                email,
                password
            }
        )
        await sendEmails(email,3,nombre);

    } catch (error) {
        return res.status(500).json({
            message: "Error al registrar el administrador",
        })
    }
}


//login admin
export const LoginAdminGet = (req, res) => {
    res.send("login de administradores")
}


export const LoginAdminPost = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password]);

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

//recuperar contraseña admin
export const RecuperarAdminGet = (req, res) => {
    res.send("Recuperar contraseña Administrador");
};

export const RecuperarAdminPost = async (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({
            message: "Por favor, ingrese su correo.",
        });
        
    }

    try {
        const [recover] = await pool.query(
            `SELECT email_admin FROM administrador WHERE email_admin = ?`,
            [email]
        );

        let tokensEmail = Math.floor(Math.random() * 100000);
        const [recover2] = await pool.query(
            `UPDATE administrador SET token_admin = ? WHERE email_admin = ?`,
            [tokensEmail, email]
        );

        await sendEmails(email, tokensEmail, 4, tokensEmail);

        res.send("Correo enviado correctamente");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al enviar correo" });
    }
};

export const VerificarAdmin= async (req, res) => {
    const token = req.body.token;
    const password = req.body.password;

    if (!token || !password) {
        return res.status(400).json({
            message: "Por favor, ingrese el código de recuperación y la nueva contraseña",
        });

    }

    const saltAdmin = 10;
    const hashedPasswordAdmin = await bcrypt.hash(password, saltAdmin);

    


    try {
        const [recoverAd] = await pool.query(
            `SELECT token_admin FROM administrador WHERE token_admin = ?`,
            [token]
        );
        if (recoverAd.length > 0) {
            const [recoverAd2] = await pool.query(
                `UPDATE administrador SET contraseña_admin = ? WHERE token_admin = ?`,
                [hashedPasswordAdmin, token]
            );
            res.status(200).json({ message: "Contraseña actualizada" });

            const { email } = req.body;
            const [admin] = await pool.query(
                "SELECT * FROM administrador WHERE email_admin = ?",
                [email]
            );
            console.log("correcto");
        } else {
            console.log("Token not found");
            res.status(401).json({ message: "Codigo invalido" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al verificar el codigo",
        });
    }
};


//update admin
export const updateAdminGet = (req, res) => {
    res.send("Actualizar Admin")
}

export const updateAdminPost = async (req, res) => {
    const {email,id}=req.body;

    

    try {
        const [rows] = await pool.query(`UPDATE administrador SET email_admin=? WHERE id_admin=?`, [email,id]);
        res.status(200).json({ message: 'Admin actualizado correctamente' });

        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar Administrador' });

    }
}

//delete admin

export const deleteAdminGet = (req, res) => {
    res.send("Eliminar Admin")
}

export const deleteAdminPost = async (req, res) => {
    const {id_admin}=req.body;

    try {
        const [rows] = await pool.query(`DELETE FROM admin WHERE id_admin=?`, [id_admin]);
        res.status(200).json({ message: 'Admin eliminado correctamente' });

        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar Administrador' });

    }
}



//asignar domiciliario
export const asignarDomiciliarioGet = (req, res) => {
    res.send("Asignar domiciliario")


}

export const asignarDomiciliarioPost = async (req, res) => {
    const { id_domiciliario, id_compra } = req.body;
    try {
        const [rows] = await pool.query(`UPDATE factura SET id_dom=? WHERE id_compra=?`, [id_domiciliario, id_compra]);
        res.status(200).json({ message: 'Domiciliario asignado correctamente' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al asignar domiciliario' });

    }
}