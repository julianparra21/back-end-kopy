import jwt from "jsonwebtoken";
import { pool } from "../db.js";

import {uploadUser} from  "../config-cloudinary.js";

import { sendEmails } from "./helpers/nodemailer.js";

//crud usuario

export const getRegistro = async (req, res) => {
  try {
    const registros = await pool.query("SELECT * FROM cliente");
    console.log(registros);
    res.json(registros[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los registros");
  }
};

export const postRegistro = async (req, res) => {
  try {
    const { id, nombre, telefono, direccion, email, password } = req.body;

    // Verificar si alguno de los campos está vacío
    if (
      [id, nombre, telefono, direccion, email, password].some((field) => !field)
    ) {
      return res.status(400).json({
        message: "Por favor, rellene todos los campos son obligatorios.",
      });
    }

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log(nombre);
    const rows_insert = await pool.query(
      "INSERT INTO cliente (id_cliente, nombre_cliente, telefono_cliente, direccion_cliente, email_cliente, password_cliente) VALUES (?, ?, ?, ?, ?, ?)",
      [id, nombre, telefono, direccion, email, password]
    );

    if (rows_insert === undefined) {
      console.log("Error en la base de datos");
    } else {
      console.log("INSERT OK");
    }

    const data = { id, nombre, telefono, direccion, email, password };
    res.status(200).send("Usuario creado correctamente");

    await sendEmails(email, 1, nombre);
    console.log("Se envía el correo");
  } catch (error) {
    console.log("No se envía el correo");
    console.log(error);
    return res.status(500).json({
      message: "Error al crear el usuario",
    });
  }
};

//login usuario

export const LoginGet = (req, res) => {
  res.send("login de usuarios");
};

//recuperar contraseña usuario

export const LoginPost = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password || email.trim() === '' || password.trim() === '') {
      return res.status(400).json({
        message: "El email y la contraseña son campos obligatorios."
      });
    }

    const [rows] = await pool.query('SELECT * FROM cliente WHERE email_cliente = ? ', [email]);

    if (rows.length > 0) {
      const storedPassword = rows[0].password_cliente;

      if (password === storedPassword) {
        const email = rows[0].email_cliente;

        const token = jwt.sign(
          { email: email }, 
          process.env.SECRET || "TokenGenerate",
          { expiresIn: 60 * 60 * 24 }
        );

        return res.status(200).json({ auth: true, token: token, email: email });
      } else {
        return res.status(401).json({
          message: "El email o la contraseña son incorrectos"
        });
      }
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
};

export const RecuperarGet = (req, res) => {
  res.send("Recuperar contraseña");
};

export const RecuperarPost = async (req, res) => {
  console.log(req.body);
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({
        message: "Por favor, ingrese su correo electrónico",
      });
    }

    const [rows] = await pool.query(
      `SELECT email_cliente FROM cliente WHERE email_cliente = ?`,
      [email]
    );

    if (rows.length > 0) {
      let tokensEmail = Math.floor(Math.random() * 100000);

      const [rows3] = await pool.query(
        `UPDATE cliente SET token_cliente = ? WHERE email_cliente = ?`,
        [tokensEmail, email]
      );
      await sendEmails(email, 4, tokensEmail);
    }

    res.send(
      "Se ha enviado un correo electrónico a su cuenta de correo electrónico con un código de verificación. Por favor, verifique su correo electrónico para continuar"
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al enviar correo" });
  }
};

export const Verificar = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message:
          "Por favor, ingrese el código de recuperación y la nueva contraseña",
      });
    }

    // const saltUser = 10;
    // const hashedPassword = await bcrypt.hash(password, saltUser);

    const [rows] = await pool.query(
      `SELECT token_cliente FROM cliente WHERE token_cliente = ?`,
      [token]
    );
    if (rows.length > 0) {
      const [rows2] = await pool.query(
        `UPDATE cliente SET password_cliente = ? WHERE token_cliente = ?`,
        [password, token]
      );
      return res
        .status(200)
        .json({ message: "Contraseña actualizada correctamente" });
    } else {
      return res
        .status(401)
        .json({ message: "El código de recuperación es incorrecto" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al verificar el código de recuperación",
    });
  }
};

//update usuario
export const updateUsuarioGet = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM cliente WHERE email_cliente = ?",

      [req.userId.id]
    );
    console.log(rows);
    res.render("cliente/update", { rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al actualizar el usuario",
    });
  }
};

export const updateUsuarioPost = async (req, res) => {
  try {
    let image = req.files ? req.files.image.tempFilePath : null;
    let img = image ? await uploadUser(image) : null;
    let urlPhoto = image && img ? img.secure_url : null;
    console.log(req.body)
    

    const { nombre, telefono, direccion } = req.body;
    const updateFields = {};

    if (nombre) {
      updateFields.nombre_cliente = nombre;
    }
    if (telefono) {
      updateFields.telefono_cliente = telefono;
    }
    if (direccion) {
      updateFields.direccion_cliente = direccion;
    }

    if (urlPhoto) {
      updateFields.image = urlPhoto; 
      const [updateImageResult] = await pool.query(
        "UPDATE cliente SET image = ? WHERE email_cliente = ?",
        [urlPhoto, req.userId.id]
      );  
      console.log(updateImageResult);
    }

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No se proporcionaron datos para actualizar" });
    }

    const [rows] = await pool.query(
      "UPDATE cliente SET ? WHERE email_cliente = ?",
      [updateFields, req.userId.id]
    );
      return res.status(200).send({
        message: "Usuario actualizado correctamente",
      })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al actualizar el usuario",
    });
  }
};


//view profile
export const viewProfileGet = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cliente', [req.userId.id]);

    if (rows >0 ) {
      return res.state = {
        message: "Usuario no encontrado"

      }
    } else {
      return res.status(200).json(rows[0]);

      
    }

} catch (error) {
    console.error(error);
}
}


//delete usuario
export const eliminarCuenta = async (req, res) => {
   
        const { id } = req.params;
    try {
        const [rows] = await pool.query('DELETE FROM cliente WHERE id_cliente = ?', [id]);
        res. status(200).json({ message: "Usuario eliminado correctamente" });
        
    } catch (error) {
        console.error(error);
    } 

};
