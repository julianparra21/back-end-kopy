import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";

import { sendEmails } from "./helpers/nodemailer.js";

//crud usuario
export const getRegistro = (req, res) => {
    res.send("Registro de usuarios")
}


export const postRegistro = async (req, res) => {
    try {
        const { nombre, apellido,telefono,direccion, email, password } = req.body
        const saltCli = 10;
        const hashedPassword = await bcrypt.hash(password, saltCli);


        console.log(nombre);
        const [rows] = await pool.query('INSERT INTO cliente (nombre_cliente,apellido_cliente,telefono_cliente,direccion_cliente,email_cliente,password_cliente) VALUES (?,?,?,?,?,?)', [nombre, apellido,telefono,direccion, email, hashedPassword])
        
        res.send(
            {
                nombre,
                apellido,
                telefono,
                direccion,  
                email,
                password,
                
            }
            
        )
        await sendEmails(email,1,nombre);
      
        

        console.log("se envia el correo");




    } catch (error) {
        console.log("no se envia el correo");
        console.log(error);
        return res.status(500).json({
            message: "Error al crear el usuario",
        })
    }

}


//login usuario
export const LoginGet = (req, res) => {
    res.send("login de usuarios")
}
//GET LOGIN DOMICILIARIOS

export const LoginPost = async (req, res) => {
    
    try {
        
        const { email, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM registro WHERE email = ? AND password = ?', [email, password]);

        if(rows.length > 0) {
            const token= jwt.sign(
                {id: rows.email},
                process.env.SECRET || "TokenGenerate",
                {expiresIn: 60 * 60 * 24}
            )
            return res.json({auth:true, token:token});
        } else {
            return res.status(401).json({
                message: "El email o la contraseña son incorrectos"
            });
        }
    } catch (error) {
        return res.json({
            message: "Error al iniciar sesión",
        })
    }
}

//recuperar contraseña usuario
export const RecuperarGet = (req, res) => {
    res.send("Recuperar contraseña")
}



export const RecuperarPost = async (req, res) => {
    const email = req.body.email;
    try {
        const [rows] = await pool.query(`SELECT email_cliente FROM cliente WHERE email_cliente = ?`, [email]);
        
        let tokensEmail = Math.floor(Math.random() * 100000);
        const [rows2] = await pool.query(`UPDATE cliente SET token_cliente = ? WHERE email_cliente = ?`, [tokensEmail, email]);

        await sendEmails(email,tokensEmail, 4,tokensEmail);
       
    
        res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al enviar correo' });
    }
};

export const Verificar = async (req, res) => {
    const token = req.body.token;
    const password = req.body.password;

    const saltUser = 10;
    const hashedPassword = await bcrypt.hash(password, saltUser);

    try {
        const [rows] = await pool.query(`SELECT token_cliente FROM cliente WHERE token_cliente = ?`, [token]);
        if (rows.length > 0) {
            const [rows2] = await pool.query(`UPDATE cliente SET password_cliente = ? WHERE token_cliente = ?`, [hashedPassword, token]);
            res.status(200).json({ message: "Contraseña actualizada" });

            const { email } = req.body;
            const [rows] = await pool.query('SELECT * FROM cliente WHERE email_cliente = ?', [email]);

        }

        else {
            res.status(401).json({ message: "Codigo err " });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error al verificar el codigo",
        })
    }

}

//update usuario
export const updateUsuarioGet = (req, res) => {
    res.send("Actualizar Usuario")
}

export const updateUsuarioPost = async (req, res) => {
    const {email,telefono}=req.body;

    try {
        const [rows] = await pool.query(`UPDATE usuario SET email=?,telefono=? WHERE id_usuario=?`, [email,telefono]);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });

        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar Usuario' });

    }
}
