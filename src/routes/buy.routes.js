import { Router } from "express";
import { buyPost, buyGet } from "../controllers/buy.controller.js";
const router = Router();

router.get("/compra", buyGet);

router.post("/compra", buyPost);

export default router;