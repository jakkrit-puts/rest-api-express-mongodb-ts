import express from "express";
import { checkSchema } from "express-validator";
import { createProduct, deleteProductByID, getProductByID, getProducts, updateProductByID } from "../controllers/product.ctrl";
import { ProductCreateValidate, ProductUpdateValidate } from "../validations/product.validation";
import authJWT from "../middlewares/authJWT";

const router = express.Router();

router.post("/", authJWT, checkSchema(ProductCreateValidate), createProduct);
router.get("/", authJWT, getProducts);
router.get("/:id", authJWT,  getProductByID);
router.delete("/:id", authJWT, deleteProductByID);
router.put("/", authJWT, checkSchema(ProductUpdateValidate), updateProductByID);

export default router;
