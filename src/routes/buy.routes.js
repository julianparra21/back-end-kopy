import { Router } from "express";

import { getBuys,createBuy } from "../controllers/buy.controller";

const router = Router();

router.get("/compra", getBuys);


router.post("/compra",createBuy);

