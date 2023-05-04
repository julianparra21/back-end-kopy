import { Router } from "express";
import { postRegistro,LoginPost,LoginGet,RecuperarGet,RecuperarPost,Verificar,getRegistro,updateUsuarioGet,updateUsuarioPost } from "../controllers/user.controller.js";

const router = Router();

//crud usuario
router.get("/registro", getRegistro);
router.get("/login", LoginGet);
router.get("/recuperar", RecuperarGet);
router.get("/update", updateUsuarioGet);
router.get("/verificar", Verificar);


router.post("/registro", postRegistro);
router.post("/login", LoginPost);
router.post("/recuperar", RecuperarPost);
router.post("/update", updateUsuarioPost);
router.post("/verificar", Verificar);


export default router;
