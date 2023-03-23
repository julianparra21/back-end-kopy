import { Router } from 'express'
import { getRegistro,postRegistro,LoginPost, LoginGet,RecuperarGet, RecuperarPost,Verificar } from '../controllers/registro.controller.js'
const router = Router();

router.get("/registro", getRegistro);

router.post("/registro", postRegistro );

router.get("/login", LoginGet);

router.post("/login", LoginPost);

router.get("/recuperar", RecuperarGet)

router.post("/recuperar", RecuperarPost)

router.post('/verificar:Token', Verificar)


export default router;