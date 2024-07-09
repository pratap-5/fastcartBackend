import express from "express";
import { addCart, getCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add_cart", addCart);
router.get("/get_cart", getCart);

export default router;
