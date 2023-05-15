import { Schema } from "express-validator";

export const CategoryCreateValidate: Schema = {
  cat_id: { notEmpty: true, errorMessage: "cat_id required" },
  cat_name: { notEmpty: true, errorMessage: "cat_name required" },
  cat_desc: { notEmpty: true, errorMessage: "cat_desc required" },
};

export const CategoryUpdateValidate: Schema = {
  cat_name: { notEmpty: true, errorMessage: "cat_name required" },
  cat_desc: { notEmpty: true, errorMessage: "cat_desc required" },
};
