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
        const {id, nombre,telefono,direccion, email, password } = req.body;

        // Verificar si alguno de los campos está vacío
        if ([id,nombre,  telefono, direccion, email, password].some(field => !field)) {
            return res.status(400).json({
                message: "Por favor, rellene todos los campos  son obligatorios."
            });
        }
      
        const saltCli = 10;
        const hashedPassword = await bcrypt.hash(password, saltCli);

        console.log(nombre);
        const rows_insert = await pool.query('INSERT INTO cliente (id_cliente,nombre_cliente,telefono_cliente,direccion_cliente,email_cliente,password_cliente) VALUES (?,?,?,?,?,?)', [id,nombre, telefono,direccion, email, hashedPassword],
            
        ()=>{
            if(rows_insert==undefined){
                console.log("Error en la base de datos");
            }else{
                console.log("INSERT OK");
            }
        }
        )
    
        const data={id,nombre, telefono,direccion, email, hashedPassword}.json;
        res.send(data);


        await sendEmails(email,1,nombre);
        console.log("se envia el correo");
    } catch (error) {
        console.log("no se envia el correo");
        console.log(error);
        return res.status(500).json({
            message: "Error al crear el usuario",
        });
    }
};




//login usuario

export const LoginGet = (req, res) => {
    res.send("login de usuarios")
}

export const LoginPost = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el email o la contraseña están ausentes o son una cadena vacía
        if (!email || !password || email.trim() === '' || password.trim() === '') {
            return res.status(400).json({
                message: "El email y la contraseña son campos obligatorios."
            });
        }

        const [rows] = await pool.query('SELECT * FROM cliente WHERE email_cliente = ? ', [email]);

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
        console.error(error);
        return res.status(500).json({
            message: "Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde."
        });
    }
}



//recuperar contraseña usuario
export const RecuperarGet = (req, res) => {
    res.send("Recuperar contraseña")
}



export const RecuperarPost = async (req, res) => {
    console.log(req.body);
    try {
        const email = req.body.email;

        if (!email) {
            return res.status(400).json({
                message: "Por favor, ingrese su correo electrónico"
            });
        }

        const [rows] = await pool.query(`SELECT email_cliente FROM cliente WHERE email_cliente = ?`, [email]);

        if (rows.length > 0) {
            let tokensEmail = Math.floor(Math.random() * 100000);
            const [rows2] = await pool.query(`UPDATE cliente SET token_cliente = ? WHERE email_cliente = ?`, [tokensEmail, email]);

            await sendEmails(email, tokensEmail, 4, tokensEmail);

            return res.status(200).json({ message: 'Correo enviado correctamente' });
        } else {
            return res.status(401).json({ message: "El correo electrónico no está registrado" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al enviar correo' });
    }
};

export const Verificar = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                message: "Por favor, ingrese el código de recuperación y la nueva contraseña"
            });
        }

        const saltUser = 10;
        const hashedPassword = await bcrypt.hash(password, saltUser);

        const [rows] = await pool.query(`SELECT token_cliente FROM cliente WHERE token_cliente = ?`, [token]);
        if (rows.length > 0) {
            const [rows2] = await pool.query(`UPDATE cliente SET password_cliente = ? WHERE token_cliente = ?`, [hashedPassword, token]);
            return res.status(200).json({ message: "Contraseña actualizada correctamente" });
        } else {
            return res.status(401).json({ message: "El código de recuperación es incorrecto" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al verificar el código de recuperación",
        })  
    }
}


//update usuario
export const updateUsuarioGet = (req, res) => {
    res.send("Actualizar Usuario")
}

export const updateUsuarioPost = async (req, res) => {
    const {id,nombre,apellido,telefono,direccion,email}=req.body;

    const [rows] = await pool.query('UPDATE cliente SET nombre_cliente=?,apellido_cliente=?,telefono_cliente=?,direccion_cliente=?,email_cliente=? WHERE id_cliente=?', [nombre,apellido,telefono,direccion,email,id]);

    res.send({

        id,
        nombre,
        apellido,
        telefono,
        direccion,
        email,

    })


};