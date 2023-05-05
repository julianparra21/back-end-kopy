import { pool } from "../db";

export const getBuys = async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM compras");
        res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
}

export const getBuyById = async (req, res) => {
    
}