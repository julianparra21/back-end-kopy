import { pool } from "../db.js";
import nodemailer from "nodemailer";





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


