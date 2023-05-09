import { pool } from "../db";

export const getBuys = async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM compra");
        res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
}

export const getBuyById = async (req, res) => {
    
}

export const createBuy = async (req, res) => {
    const {id_producto,cantidad_producto,precio} = req.body;
    try {

        const response = await pool.query("INSERT INTO compra (id_producto,cantidad_producto,precio) VALUES ($1,$2,$3)", [id_producto,cantidad_producto,precio]);
        res.json({
            message: "Compra agregada exitosamente",
            body: {
                buy: {id_producto,cantidad_producto,precio}
            }
        }) 
  } catch (e) {
        console.log(e);
        res.status(500).json("Compra no realizada");
        
    }


}