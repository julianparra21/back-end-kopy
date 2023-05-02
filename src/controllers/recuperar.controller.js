import { pool } from "../db.js";

import { sendEmails } from "./helpers/nodemailer.js";

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

    try {
        const [rows] = await pool.query(`SELECT token_cliente FROM cliente WHERE token_cliente = ?`, [token]);
        if (rows.length > 0) {
            const [rows2] = await pool.query(`UPDATE cliente SET password_cliente = ? WHERE token_cliente = ?`, [password, token]);
            res.status(200).json({ message: "Contraseña actualizada" });

            const { email } = req.body;
            const [rows] = await pool.query('SELECT * FROM cliente WHERE email_cliente = ?', [email]);

        }

        else {
            res.status(401).json({ message: "Codigo error" });
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
        const [rows] = await pool.query(`SELECT email_admin FROM administrador WHERE email_admin = ?`, [email]);
        let tokenEmail = Math.floor(Math.random() * 100000);
       
        const [rows2] = await pool.query(`UPDATE administrador SET token_admin = ? WHERE email_admin = ?`, [tokenEmail, email]);

        await sendEmails(email, tokenEmail, 5, tokenEmail);
        
        res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al enviar correo' });
    }
};

// export const VerificarAdmin = async (req, res) => {
//    const token= req.body.token;
//     const password = req.body.password;

//     try {
//         const [rows] = await pool.query(`SELECT token_admin FROM administrador WHERE token_admin = ?`, [token]);
//         if (rows.length > 0) {
//             const [rows2] = await pool.query(`UPDATE administrador SET contraseña_admin = ? WHERE token_admin = ?`, [password, token]);
//             res.status(200).json({ message: "Contraseña actualizada" });

//             const { email } = req.body;
//             const [rows] = await pool.query('SELECT * FROM administrador WHERE email_admin = ?', [email]);

//         }

//         else {
//             res.status(401).json({ message: "Codigo incorrecto" });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: "Error al verificar el codigo",
//         })
//     }

// }

export const VerificarAdmin = async (req, res) => {
    const token = req.body.token_admin;
  
    const password = req.body.contraseña_admin;
  
    try {
     const [rows] = await pool.query(`SELECT token_admin FROM administrador WHERE token_admin = ?`, [token]);

      if (rows.length > 0) {
        const [updateResult] = await pool.query(`UPDATE administrador SET contraseña_admin = ? WHERE token_admin = ?`, [password, token]);
  
        res.status(200).json({ message: "Contraseña actualizada" });
  
        // Usa los datos de la consulta aquí
  
      } else {
        res.status(401).json({ message: "Código invalido" });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error al verificar el código",
        error: error
      });
    }
  };
  

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

    try {
        const [rows] = await pool.query(`SELECT token_dom FROM domiciliario WHERE token_dom = ?`, [tokenD]);
        if (rows.length > 0) {
            const [rows2] = await pool.query(`UPDATE domiciliario SET contraseña_dom = ? WHERE token_dom = ?`, [contraseña, tokenD]);
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