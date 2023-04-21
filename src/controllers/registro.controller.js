import { pool } from "../db.js";
import nodemailer from "nodemailer";
import { sendEmails } from "./helpers/nodemailer.js";



export const getRegistro = (req, res) => {
    res.send("Registro de usuarios")
}

// export const postRegistro = async (req, res) => {

//     try {
//         const { nombre, apellido, email, password } = req.body
//         const [rows] = await pool.query('INSERT INTO registro (nombre,apellido,email,password) VALUES (?,?,?,?)', [nombre, apellido, email, password])
//         res.send('Username created successfully')

        
//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 587,
//             auth: {
//                 user: "kopycrazy@gmail.com",
//                 pass: "rcyxbrlzopvcmaks",
//             }

//         });

//         transporter.sendMail({
//             from: 'kopycrazy@gmail.com',
//             to: email,
//             subject: 'Registro exitoso',
//             html: '<h1>SU REGISTRO FUE EXITOSO</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p><b>' + nombre + '</b> ,El presente correo es para informar que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy  crazy fruit</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web</p>',
//         }).then((res) => {
//             console.log(res);
//         }).catch((err) => {
//             console.log(err);
//         });

//         console.log("se envia el correo");




//     } catch (error) {
//         console.log("no se envia el correo");
//         return res.status(500).json({
//             message: "Error al crear el usuario",
//         })
//     }

// }


export const postRegistro = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body
        console.log(nombre);
        const [rows] = await pool.query('INSERT INTO registro (nombre,apellido,email,password) VALUES (?,?,?,?)', [nombre, apellido, email, password])
        
        res.send(
            {
                nombre,
                apellido,
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
        const { nombre, apellido, email, password,id,telefono,identificacion } = req.body
        const [rows] = await pool.query('INSERT INTO domiciliario (nombre,apellido,email,password,id,telefono,identificacion) VALUES (?,?,?,?,?,?,?)',
         [nombre,
          apellido,
          email,
          password,
          id_domiciliario,
          telefono,
          identificacion])
        
          await sendEmails(email,2,nombre);
      

        
       

        console.log("se envia el correo");

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








export const registroAdminGet = (req, res) => {
    res.send("Registro de administradores")
}

export const registroAdminPost = async (req, res) => {
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
        await sendEmails(email,3,nombre);

    } catch (error) {
        return res.status(500).json({
            message: "Error al registrar el administrador",
        })
    }
}








