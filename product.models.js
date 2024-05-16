import express from "express";
import cors from "cors";
import{
    getProducts,
    getProductBySKU,
    addProduct,
    updateProduct
}
from "./products.controller.js";

const router =express.Router();
router.use(cors());

router.get('/',getProducts);
router.post('/',addProduct);
router.put('/:id',updateProduct);

router.get('/get-product-by-sku',getProductBySKU);

export default router;


