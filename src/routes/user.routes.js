import { Router } from "express";
import {
  postRegistro,
  LoginPost,
  LoginGet,
  RecuperarGet,
  RecuperarPost,
  Verificar,
  getRegistro,
  viewProfileGet,
  updateUsuarioGet,
  updateUsuarioPost,
  eliminarCuenta
} from "../controllers/user.controller.js";

import { verifyToken } from "../controllers/validateToken.js";
import { verify } from "jsonwebtoken";

const router = Router();

//crud usuario
router.get("/registro", getRegistro);
router.get("/login", LoginGet);
router.get("/recuperar", RecuperarGet);
router.get("/update",updateUsuarioGet);
router.get("/verificar", Verificar);
router.get("/profile",verifyToken, viewProfileGet);

router.post("/registro", postRegistro);
router.post("/login", LoginPost);
router.post("/recuperar", RecuperarPost);
router.put("/updateDatos", verifyToken, updateUsuarioPost);
router.post("/verificar", Verificar);

router.delete("/eliminar/:id",eliminarCuenta, verifyToken)

export default router;
