import { pool } from "../db";

export const getBuys = async (req, res, next) => {
  try {
    const response = await pool.query("SELECT * FROM compra");
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createBuy = async (req, res, next) => {
  try {
    const { id_cliente, id_producto, cantidad, total } = req.body;

    // Validar la entrada
    if (!id_cliente || !id_producto || !cantidad || !total) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Obtener la información del producto
    const [rows] = await pool.query(
      "SELECT cantidad_producto, precio FROM producto WHERE id_producto = ?",
      [id_producto]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "El producto no existe" });
    }

    const producto = rows[0];
    const cantidadDisponible = producto.cantidad_producto;

    // Verificar si hay suficiente cantidad del producto disponible
    if (cantidad > cantidadDisponible) {
      return res
        .status(400)
        .json({ message: "No hay suficiente cantidad del producto disponible" });
    }

    // Calcular el nuevo stock del producto y actualizarlo en la base de datos
    const nuevoStock = cantidadDisponible - cantidad;
    await pool.query(
      "UPDATE producto SET cantidad_producto = ? WHERE id_producto = ?",
      [nuevoStock, id_producto]
    );

    // Insertar la compra en la base de datos
    const [result] = await pool.query(
      "INSERT INTO compra(id_cliente, id_producto, cantidad_compra, precio_compra) VALUES (?, ?, ?, ?)",
      [id_cliente, id_producto, cantidad, producto.precio]
    );

    res
      .status(200)
      .json({ message: "Compra realizada correctamente", id_compra: result.insertId });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default { getBuys, createBuy };
