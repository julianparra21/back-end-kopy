import { Router } from "express";
import fileUpload from "express-fileupload";
import {ComprarProductoGet,ComprarProductoPost, IngresoProductoGet,ActualizarProductoGet,actualizarProducto,EliminarProductoGet,deleteProduct,IngresoProductoPost,ObtenerProductos } from "../controllers/producto.controller.js";

const router = Router();

router.get("/ingreso", IngresoProductoGet);
router.post("/ingreso", fileUpload({useTempFiles:true,tempFileDir:"./images"}), IngresoProductoPost);

router.get("/eliminar", EliminarProductoGet);
router.delete("/eliminar/:id", deleteProduct);

router.get("/actualizar", ActualizarProductoGet);
router.put("/actualizar/:id", actualizarProducto);


router.get("/comprar", ComprarProductoGet);
router.post("/comprar", ComprarProductoPost);


router.get("/obtener/:Category",ObtenerProductos)



export default router;

