import { pool } from "../db.js";
import nodemailer from "nodemailer";
import { sendEmails } from "./helpers/nodemailer.js";



export const getRegistro = (req, res) => {
    res.send("Registro de usuarios")
}


export const postRegistro = async (req, res) => {
    try {
        const { nombre, apellido,telefono,direccion, email, password } = req.body
        console.log(nombre);
        const [rows] = await pool.query('INSERT INTO cliente (nombre_cliente,apellido_cliente,telefono_cliente,direccion_cliente,email_cliente,password_cliente) VALUES (?,?,?,?,?,?)', [nombre, apellido,telefono,direccion, email, password])
        
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




//REGISTRO DOMICILIARIO


export const Registrodomiciliario = async (req, res) => {
    try {
        const { nombre, apellido, telefono,email, password } = req.body
        const [rows] = await pool.query('INSERT into domiciliario (nombre_dom,apellido_dom,telefono_dom,correo_dom,contraseña_dom) VALUES (?,?,?,?,?)', [nombre, apellido, telefono,email, password])
        
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






//Registro Administrador

export const registroAdminGet = (req, res) => {
    res.send("Registro de administradores")
}

export const registroAdminPost = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body
        const [rows] = await pool.query('INSERT INTO administrador (nombre_admin,apellido_admin,email_admin,contraseña_admin) VALUES (?,?,?,?)', [nombre, apellido, email, password])
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








