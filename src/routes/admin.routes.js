import { Router } from "express";
import { registroAdminGet,LoginAdminGet,LoginAdminPost,RecuperarAdminGet,RecuperarAdminPost,VerificarAdmin,deleteAdminGet,deleteAdminPost,registroAdminPost,updateAdminGet,updateAdminPost } from "../controllers/admin.controller.js";

const router = Router();

//crud admin
router.get("/registro", registroAdminGet);
router.get("/login", LoginAdminGet);
router.get("/recuperar", RecuperarAdminGet);
router.get("/update", updateAdminGet);
router.get("/verificar", VerificarAdmin);
router.get("/delete", deleteAdminGet);

router.post("/registro", registroAdminPost);
router.post("/login", LoginAdminPost);
router.post("/recuperar", RecuperarAdminPost);
router.post("/update", updateAdminPost);
router.post("/delete", deleteAdminPost);
router.post("/verificar", VerificarAdmin);


export default router;