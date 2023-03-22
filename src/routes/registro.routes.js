import { Router } from 'express'
import { getRegistro,postRegistro,LoginPost, LoginGet } from '../controllers/registro.controller.js'
const router = Router();

router.get("/registro", getRegistro);

router.post("/registro", postRegistro );

router.get("/login", LoginGet);

router.post("/login", LoginPost);

export default router;