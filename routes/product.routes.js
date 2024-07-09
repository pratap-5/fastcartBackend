import express from "express";
import {
  addProduct,
  getProduct,
  getProductDetails,
  getSearchList,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add_product", addProduct);
router.get("/get_product", getProduct);

router.get("/get_details/:productId", getProductDetails);

router.get("/search/:searchItem", getSearchList);

export default router;
