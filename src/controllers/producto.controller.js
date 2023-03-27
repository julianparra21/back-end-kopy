import { pool } from "../db.js";
import nodemailer from "nodemailer";


export const IngresoProductoGet = (req, res) => {
    res.send("Ingreso de productos")
}

export const IngresoProductoPost = async (req, res) => {
    const {nombre,precio,descripcion,imagen}=req.body;

    try {
        const [rows] = await pool.query(`INSERT INTO productos (nameProduct,priceProduct,descriptionProduct,imageProduct) VALUES (?,?,?,?)`, [nombre,precio,descripcion,imagen]);
        res.status(200).json({ message: 'Producto ingresado correctamente' });
        

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
        const [rows] = await pool.query(`DELETE FROM productos WHERE id = ?`, [id]);
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
        const [rows] = await pool.query(`UPDATE productos SET nameProduct=?, priceProduct=?, descriptionProduct=?, imageProduct=? WHERE id=?`, [nombre,precio,descripcion,imagen,id]);
        res.status(200).json({ message: 'Producto actualizado correctamente' });

        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
}


//carrito de compras
 

