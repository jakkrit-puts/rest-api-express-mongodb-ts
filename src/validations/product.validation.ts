import { Schema } from "express-validator";

export const ProductValidate: Schema = {
  prod_id: { notEmpty: true, errorMessage: "prod_id required" },
  prod_name: { notEmpty: true, errorMessage: "prod_name required" },
  prod_desc: { notEmpty: true, errorMessage: "prod_desc required" },
  prod_qty: { notEmpty: true, errorMessage: "prod_qty required" },
  prod_image_url: { notEmpty: true, errorMessage: "prod_image_url required" },
};
