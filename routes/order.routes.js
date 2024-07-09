import express from "express";
import { getOrder, makeOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/make_order", makeOrder);
router.get("/get_order", getOrder);

export default router;
