import { Router } from "express";

import { getBuys } from "../controllers/buy.controller";

const router = Router();

router.get("/compra", getBuys);

