import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";

import { sendEmails } from "./helpers/nodemailer.js";

//registro domiciliario
export const Registrodomiciliario = async (req, res) => {
  try {
    const { id, nombre, telefono, email, password } = req.body;

    // Verificar que todos los campos estén presentes
    if (!id || !nombre || !telefono || !email || !password) {
      return res
        .status(400)
        .json({ message: "Por favor llene todos los campos" });
    }

    // Encriptar la contraseña utilizando bcrypt
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar el domiciliario en la base de datos
    const query =
      "INSERT INTO domiciliario (id_dom, nombre_dom, telefono_dom, correo_dom, contraseña_dom) VALUES (?, ?, ?, ?, ?)";
    const [rows] = await pool.query(query, [
      id,
      nombre,
      telefono,
      email,
      password,
    ]);

    // Enviar respuesta de éxito
    res.status(200).json({ message: "Registro exitoso" });

    // Envío de correo electrónico (suponiendo que la función sendEmails existe y está implementada correctamente)
    await sendEmails(email, 2, nombre);
  } catch (error) {
    console.log("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const GetRegistrodomiciliario = (req, res) => {
  res.send("Registro de Domiciliarios");
};

//login domiciliario
export const LoginDomiciliario = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return res.status(400).json({
        message: "El email y la contraseña son campos obligatorios.",
      });
    }

    const [rows] = await pool.query(
      `SELECT * FROM domiciliario WHERE correo_dom = ?`,
      [email]
    );
   if (rows.length>0) {
    const validatePassword= rows[0].contraseña_dom;
    if (password === validatePassword) {
      const email = rows[0].email_cliente;

      const token = jwt.sign(
        { email: email },
        process.env.SECRET || "TokenGenerate",
        { expiresIn: 60 * 60 * 24 }
      );

      return res.status(200).json({ auth: true, token: token, email: email });
    } else {
      return res.status(401).json({
        message: "El email o la contraseña son incorrectos",
      });
    }
  } else {
    return res.status(401).json({
      message: "El email o la contraseña son incorrectos",
    });
  }
} catch (error) {
  console.error(error);
  return res.status(500).json({
    message:
      "Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.",
  });
}
}

//recuperar contraseña domiciliario
export const RecuperarDomiciliarioGet = (req, res) => {
  res.send("Recuperar contraseña de domiciliario");
};

export const RecuperarDomiciliarioPost = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(401).json({ message: "Por favor ingrese el correo" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT correo_dom FROM domiciliario WHERE correo_dom = ?`,
      [email]
    );
    let tokenEmails = Math.floor(Math.random() * 100000);

    await sendEmails(email, tokenEmails, 6, tokenEmails);

    res.status(200).json({ message: "Correo enviado correctamente" });

    const [rows2] = await pool.query(
      `UPDATE domiciliario SET token_dom = ? WHERE correo_dom = ?`,
      [tokenEmails, email]
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al enviar correo" });
  }
};

export const VerificarDomiciliario = async (req, res) => {
  const tokenD = req.body.token;
  const contraseña = req.body.password;

  if (!tokenD || !contraseña) {
    return res.status(401).json({
      message:
        "Por favor, ingrese el código de recuperación y la nueva contraseña",
    });
  }

  // const salAdmin = 10;
  // const hashedPasswordAdmin = await bcrypt.hash(contraseña, salAdmin);

  try {
    const [rows] = await pool.query(
      `SELECT token_dom FROM domiciliario WHERE token_dom = ?`,
      [tokenD]
    );
    if (rows.length > 0) {
      const [rows2] = await pool.query(
        `UPDATE domiciliario SET contraseña_dom = ? WHERE token_dom = ?`,
        [contraseña, tokenD]
      );
      res.status(200).json({ message: "Contraseña actualizada" });

      const { email } = req.body;
      const [rows] = await pool.query(
        "SELECT * FROM domiciliario WHERE correo_dom = ?",
        [email]
      );
    } else {
      res.status(401).json({ message: "Codigo invalido" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error al verificar el codigo",
    });
  }
};

// GET ELIMINAR DOMICILIARIO
export const getEliminarDomiciliario = (req, res) => {
  res.send("Eliminar Domiciliario");
};
//ELIMINAR DOMICILIARIO

export const postEliminarDomiciliario = async (req, res) => {
  const { id_domiciliario } = req.body;

  try {
    const [rows] = await pool.query(`DELETE FROM domiciliario WHERE id = ?`, [
      id,
    ]);
    res.status(200).json({ message: "Domiciliario eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

//update domiliario
export const updateDomiciliarioGet = (req, res) => {
  res.send("Actualizar Domiciliario");
};

export const updateDomiciliarioPost = async (req, res) => {
  const { email, telefono } = req.body;

  try {
    const [rows] = await pool.query(
      `UPDATE domiciliario SET email=?,telefono=? WHERE id_domiciliario=?`,
      [email, telefono]
    );
    res.status(200).json({ message: "Domiciliario actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};
