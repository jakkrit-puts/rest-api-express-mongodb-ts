import express from "express";
import { checkSchema } from "express-validator";
import { createProduct, deleteProductByID, getProductByID, getProducts, updateProductByID } from "../controllers/product.ctrl";
import { ProductCreateValidate, ProductUpdateValidate } from "../validations/product.validation";

const router = express.Router();

router.post("/", checkSchema(ProductCreateValidate), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductByID);
router.delete("/:id", deleteProductByID);
router.put("/", checkSchema(ProductUpdateValidate), updateProductByID);

export default router;
