import { pool } from "../db.js";
import nodemailer from "nodemailer";


export const IngresoProductoGet = (req, res) => {
    res.send("Ingreso de productos")
}

export const IngresoProductoPost = async (req, res) => {
    const {nombre,descripcion,cantidad,precio,categoria,id_imagen}=req.body;

    try {
        const [rows] = await pool.query(`INSERT INTO producto (nombre_producto,descripcion_producto,precio,cantidad_producto,categoria,id_imagen) VALUES (?,?,?,?,?,?)`, [nombre,descripcion,precio,cantidad,categoria,id_imagen]);
        res.status(200).json({ message: 'Producto ingresado correctamente', id: rows.insertId, nombre,descripcion,precio,categoria,id_imagen});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al ingresar producto' });


    }

}

//eliminar producto
export const EliminarProductoGet = (req, res) => {
    res.send("Eliminar producto")
}

export const EliminarProductoPost = async (req, res) => {
    const {id}=req.body;

    try {
        const [rows] = await pool.query(`DELETE FROM producto WHERE id_producto = ?`, [id]);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
}

//actualizar producto
export const ActualizarProductoGet = (req, res) => {
    res.send("Actualizar producto")
}

export const ActualizarProductoPost = async (req, res) => {
    const {id,nombre,precio,descripcion,imagen}=req.body;

    try {
        const [rows] = await pool.query(`UPDATE productos SET nombre_producto=?, precio=?, descripcion_producto=? WHERE id=?`, [nombre,precio,descripcion,id]);
        res.status(200).json({ message: 'Producto actualizado correctamente' });

        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
}


//comprar producto
export const ComprarProductoGet = (req, res) => {
    res.send("Comprar producto")
}


export const ComprarProductoPost = async (req, res) => {
    const {id_producto,id_cliente,cantidad}=req.body;

    try {
        const [rows] = await pool.query(`INSERT INTO compra (id_producto,id_cliente,cantidad_compra) VALUES (?,?,?)`, [id_producto,id_cliente,cantidad]);
        res.status(200).json({ message: 'Compra realizada correctamente' });
        const [rows2]=await pool.query(`UPDATE producto SET cantidad_producto=cantidad_producto-? WHERE id_producto=?`,[cantidad,id_producto]);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al realizar compra' });

    }

}
