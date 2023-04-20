import { Router } from 'express'
import { getRegistro,postRegistro,registroAdminGet, registroAdminPost} from '../controllers/registro.controller.js'
import { LoginGet, LoginPost,LoginAdminGet,LoginAdminPost } from '../controllers/login.controller.js'
import { RecuperarAdminGet,RecuperarGet,RecuperarPost,VerificarAdmin,Verificar,RecuperarAdminPost } from '../controllers/recuperar.controller.js'
import { IngresoProductoGet, IngresoProductoPost,EliminarProductoGet,EliminarProductoPost, ActualizarProductoGet,ActualizarProductoPost} from '../controllers/producto.controller.js'
import {LoginDomiciliario,GetLoginDomiciliario } from '../controllers/login.controller.js'
import { Registrodomiciliario,GetRegistrodomiciliario } from '../controllers/registro.controller.js'
import { addProductsGet,addProductsPost } from '../controllers/cart.controller.js'
import { getEliminarDomiciliario, postEliminarDomiciliario } from '../controllers/deleteDomiciliario.js'
import { updateDomiciliariop,updateDomiciliario } from '../EdidDomiciliario.js'
const router = Router();

router.get("/registro", getRegistro);

router.post("/registro", postRegistro );

router.post("/registroDomiciliario", Registrodomiciliario );

router.post("/loginDomiciliario", LoginDomiciliario);

router.get("/GetRegistroDomiciliario", GetRegistrodomiciliario);

router.get("/GetLoginDomiciliario", GetLoginDomiciliario);

router.post("/postEliminarDomiciliario", postEliminarDomiciliario);

router.get("/getEliminarDomiciliario", getEliminarDomiciliario);

router.post("/updateDomiciliariop",updateDomiciliariop);

router.get("/updateDomiciliario",updateDomiciliario);

router.get("/login", LoginGet);

router.post("/login", LoginPost);

router.get("/recuperar", RecuperarGet)

router.post("/recuperar", RecuperarPost)

router.post('/verificar:Token', Verificar)

router.get('/registroAdmin', registroAdminGet)

router.post('/registroAdmin', registroAdminPost)

router.get('/loginAdmin', LoginAdminGet)

router.post('/loginAdmin', LoginAdminPost)

router.get('/recuperarAdmin', RecuperarAdminGet)

router.post('/recuperarAdmin', RecuperarAdminPost)

router.post('/verificarAdmin:Token', VerificarAdmin)

router.get("/ingresoProducto", IngresoProductoGet);

router.post("/ingresoProducto", IngresoProductoPost);

router.get("/eliminarProducto", EliminarProductoGet);

router.post("/eliminarProducto", EliminarProductoPost);

router.get("/actualizarProducto", ActualizarProductoGet);

router.post("/actualizarProducto", ActualizarProductoPost);

router.get("/addProductsCart", addProductsGet);

router.post("/addProductsCart", addProductsPost);


export default router;