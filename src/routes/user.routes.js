import { Router } from "express";
import { postRegistro,LoginPost,LoginGet,RecuperarGet,RecuperarPost,Verificar,getRegistro,updateUsuarioGet,updateUsuarioPost,forgotToken,forgotTokenGet } from "../controllers/user.controller.js";

import { verifyToken } from "../controllers/validateToken.js";




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

router.get('/forgotToken', forgotTokenGet);
router.post('/forgotToken', forgotToken);


router.get('/verifyToken', verifyToken)

export default router;
