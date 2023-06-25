import { Router } from "express";
import { registroAdminGet,verificarPinGet,LoginAdminGet,LoginAdminPost,RecuperarAdminGet,RecuperarAdminPost,VerificarAdmin,deleteAdminGet,deleteAdminPost,registroAdminPost,updateAdminGet,updateAdminPost, verificarPinPost,obtenerUserInactivoGet,habilitarUsuario } from "../controllers/admin.controller.js";
import { verifyToken } from "../controllers/validateToken.js";

const router = Router();

//crud admin
router.get("/registro" ,registroAdminGet);
router.get("/login", LoginAdminGet);
router.get("/recuperar", RecuperarAdminGet);
router.get("/update", updateAdminGet);
router.get("/verificar", VerificarAdmin);
router.get("/delete",deleteAdminGet);
// router.get("/asignarDom", asignarDomiciliarioGet);
router.get("/obtenerUsuarios", obtenerUserInactivoGet);

router.post("/registro", registroAdminPost);
router.post("/login", LoginAdminPost);
router.post("/recuperar", RecuperarAdminPost);
router.post("/update", updateAdminPost);
router.post("/delete", deleteAdminPost);
router.post("/verificar", VerificarAdmin);
// router.post("/asignarDom", asignarDomiciliarioGet);
router.post("/verificarPin",verificarPinPost );
router.get("/verificarPinGet", verificarPinGet);

router.post("/habilitarUsuario", habilitarUsuario);
// http://localhost:3020/admin/recuperar
// http://localhost:3020/admin/verificar
export default router;
                                        