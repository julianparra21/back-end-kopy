import {pool} from '../db.js';

export const addProductsGet=(req,res)=>{
    res.send("Anadir productos al carrito de compras")
}
//agregar productos al carrito de compras
export const addProductsPost=async(req,res)=>{

    const {id}=req.body;

    try {
        const [rows] = await pool.query(`SELECT * FROM productos WHERE id = ?`, [id]);
        res.status(200).json({ message: 'Producto encontrado correctamente' });

        const [rows2] = await pool.query(`INSERT INTO carrito (id) VALUES (?)`, [id]);
        res.status(200).json({ message: 'Producto agregado correctamente' });


        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al agregar producto' });
    }

}


