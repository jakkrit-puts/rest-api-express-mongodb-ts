import mongoose from "mongoose";

const schema = new mongoose.Schema({
  prod_id: { type: String, required: true, trim: true },
  prod_name: { type: String, required: true, trim: true },
  prod_desc: { type: String, required: true, trim: true },
  prod_qty: { type: Number, required: true },
  prod_image: { type: String, trim: true },
  cat_id: { type: String },
},{
  timestamps: true,
  collection: 'products'
});

const product = mongoose.model("Product", schema);

export default product;
