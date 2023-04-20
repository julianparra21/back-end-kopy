import { pool } from "../db.js";

export const LoginGet = (req, res) => {
    res.send("login de usuarios")
}
//GET LOGIN DOMICILIARIOS

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

export const GetLoginDomiciliario = (req, res) => {
    res.send("Login de Domiciliarios")
}
//LOGIN DOMICILIARIO
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

