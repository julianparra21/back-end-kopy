import { Router } from "express";

import {ComprarProductoGet,ComprarProductoPost, IngresoProductoGet,ActualizarProductoGet,ActualizarProductoPost,EliminarProductoGet,EliminarProductoPost,IngresoProductoPost,ObtenerProductos } from "../controllers/producto.controller.js";

const router = Router();

router.get("/ingreso", IngresoProductoGet);
router.post("/ingreso", IngresoProductoPost);

router.get("/eliminar", EliminarProductoGet);
router.post("/eliminar", EliminarProductoPost);

router.get("/actualizar", ActualizarProductoGet);
router.post("/actualizar", ActualizarProductoPost);


router.get("/comprar", ComprarProductoGet);
router.post("/comprar", ComprarProductoPost);


router.get("/obtener",ObtenerProductos)



export default router;

