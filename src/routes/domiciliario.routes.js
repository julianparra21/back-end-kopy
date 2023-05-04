import { Router } from "express";

import { Registrodomiciliario,GetRegistrodomiciliario,LoginDomiciliario,RecuperarDomiciliarioGet, RecuperarDomiciliarioPost,VerificarDomiciliario,getEliminarDomiciliario, postEliminarDomiciliario,updateDomiciliarioGet,updateDomiciliarioPost} from "../controllers/domiciliario.controller.js";

const router = Router();

//crud domiciliario
router.get("/registro", GetRegistrodomiciliario);
router.get("/login", LoginDomiciliario);
router.get("/recuperar", RecuperarDomiciliarioGet);
router.get("/update", updateDomiciliarioGet);
router.get("/verificar", VerificarDomiciliario);
router.get("/delete", getEliminarDomiciliario);

router.post("/registro", Registrodomiciliario);
router.post("/login", LoginDomiciliario);
router.post("/recuperar", RecuperarDomiciliarioPost);
router.post("/update", updateDomiciliarioPost);
router.post("/delete", postEliminarDomiciliario);
router.post("/verificar", VerificarDomiciliario);
export default router;