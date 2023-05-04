import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";

import { sendEmails } from "./helpers/nodemailer.js";


//registro domiciliario
export const Registrodomiciliario = async (req, res) => {
    try {
        const { nombre, apellido, telefono,email, password } = req.body
        const saltDom = 10;
        const hashedPasswordDom = await bcrypt.hash(password, saltDom);

        const [rows] = await pool.query('INSERT into domiciliario (nombre_dom,apellido_dom,telefono_dom,correo_dom,contraseña_dom) VALUES (?,?,?,?,?)', [nombre, apellido, telefono,email, hashedPasswordDom])
        
        res.send(
            {
                nombre,
                apellido,
                telefono, 
                email,
                password,
                
            }
            
        )
            

          await sendEmails(email,2,nombre);
      
    

    } catch (error) {
        console.log("no se envia el correo");
        return res.status(500).json({
            message: "Error al crear el usuario",
        })
    }

}

export const GetRegistrodomiciliario = (req, res) => {
    res.send("Registro de Domiciliarios")
}


//login domiciliario
export const LoginDomiciliario = async (req, res) => {
    try {
       
        
        const { email, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM domiciliario WHERE email = ? AND password = ?', [email, password]);

        if (rows.length > 0) {
            res.send("Bienvenido al sitio");
           
        } else {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error al iniciar sesión",
        })
    }
}

//recuperar contraseña domiciliario
export const RecuperarDomiciliarioGet = (req, res) => {
    res.send("Recuperar contraseña de domiciliario")
}


export const RecuperarDomiciliarioPost = async (req, res) => {
    const email = req.body.email;
    try {
        const [rows] = await pool.query(`SELECT correo_dom FROM domiciliario WHERE correo_dom = ?`, [email]);
        let tokenEmails = Math.floor(Math.random() * 100000);

        await sendEmails(email, tokenEmails, 6, tokenEmails);
            
        res.status(200).json({ message: 'Correo enviado correctamente' });

        const [rows2] = await pool.query(`UPDATE domiciliario SET token_dom = ? WHERE correo_dom = ?`, [tokenEmails, email]);



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al enviar correo' });
    }
}

    



export const VerificarDomiciliario = async (req, res) => {
    const tokenD = req.body.token;
    const contraseña = req.body.password;
    const salAdmin=10;
    const hashedPasswordAdmin = await bcrypt.hash(contraseña, salAdmin);

    try {
        const [rows] = await pool.query(`SELECT token_dom FROM domiciliario WHERE token_dom = ?`, [tokenD]);
        if (rows.length > 0) {
            const [rows2] = await pool.query(`UPDATE domiciliario SET contraseña_dom = ? WHERE token_dom = ?`, [hashedPasswordAdmin, tokenD]);
            res.status(200).json({ message: "Contraseña actualizada" });

            const { email } = req.body;
            const [rows] = await pool.query('SELECT * FROM domiciliario WHERE correo_dom = ?', [email]);

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

// GET ELIMINAR DOMICILIARIO
export const getEliminarDomiciliario = (req, res) => {
    res.send("Eliminar Domiciliario")
}
//ELIMINAR DOMICILIARIO

export const postEliminarDomiciliario = async (req, res) => {
    const {id_domiciliario}=req.body;

    try {
        const [rows] = await pool.query(`DELETE FROM domiciliario WHERE id = ?`, [id]);
        res.status(200).json({ message: 'Domiciliario eliminado correctamente' });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
}

//update domiliario
export const updateDomiciliarioGet = (req, res) => {
    res.send("Actualizar Domiciliario")
}

export const updateDomiciliarioPost = async (req, res) => {
    const {email,telefono}=req.body;

    try {
        const [rows] = await pool.query(`UPDATE domiciliario SET email=?,telefono=? WHERE id_domiciliario=?`, [email,telefono]);
        res.status(200).json({ message: 'Domiciliario actualizado correctamente' });

        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
}

