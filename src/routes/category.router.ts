import express from "express";
import { checkSchema } from "express-validator";
import { createCategory, deleteCategoryByID, getCategoryByID, getCategorys, updateCategoryByID } from "../controllers/category.ctrl";
import { CategoryCreateValidate, CategoryUpdateValidate } from "../validations/category.validation";
import authJWT from "../middlewares/authJWT";

const router = express.Router();

router.post("/", authJWT, checkSchema(CategoryCreateValidate), createCategory);
router.get("/", authJWT,  getCategorys);
router.get("/:id", authJWT, getCategoryByID);
router.delete("/:id", authJWT, deleteCategoryByID);
router.put("/", authJWT, checkSchema(CategoryUpdateValidate), updateCategoryByID);

export default router;
