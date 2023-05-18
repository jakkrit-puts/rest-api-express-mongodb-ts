import { Schema } from "express-validator";

export const ProductCreateValidate: Schema = {
  prod_id: { notEmpty: true, errorMessage: "prod_id required" },
  prod_name: { notEmpty: true, errorMessage: "prod_name required" },
  prod_desc: { notEmpty: true, errorMessage: "prod_desc required" },
  prod_qty: { notEmpty: true, errorMessage: "prod_qty required" },
  prod_image: { notEmpty: true, errorMessage: "prod_image required" },
  cat_id: { notEmpty: true, errorMessage: "cat_id required" }
};

export const ProductUpdateValidate: Schema = {
  id: { notEmpty: true, errorMessage: "id required" },
  prod_name: { notEmpty: true, errorMessage: "prod_name required" },
  prod_desc: { notEmpty: true, errorMessage: "prod_desc required" },
  prod_qty: { notEmpty: true, errorMessage: "prod_qty required" },
  prod_image: { notEmpty: true, errorMessage: "prod_image required" },
  cat_id: { notEmpty: true, errorMessage: "cat_id required" }
};
