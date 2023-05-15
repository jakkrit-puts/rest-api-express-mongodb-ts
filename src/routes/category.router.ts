import express from "express";
import { checkSchema } from "express-validator";
import { createCategory, deleteCategoryByID, getCategoryByID, getCategorys, updateCategoryByID } from "../controllers/category.ctrl";
import { CategoryCreateValidate, CategoryUpdateValidate } from "../validations/category.validation";

const router = express.Router();

router.post("/", checkSchema(CategoryCreateValidate), createCategory);
router.get("/", getCategorys);
router.get("/:id", getCategoryByID);
router.delete("/:id", deleteCategoryByID);
router.put("/", checkSchema(CategoryUpdateValidate), updateCategoryByID);

export default router;
