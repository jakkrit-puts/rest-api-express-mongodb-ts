import mongoose from "mongoose";

const schema = new mongoose.Schema({
  prod_id: { type: String, required: true, trim: true },
  prod_name: { type: String, required: true, trim: true },
  prod_desc: { type: String, required: true, trim: true },
  prod_qty: { type: Number, required: true },
  prod_image_url: { type: String, trim: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
},{
  collection: 'products'
});

const product = mongoose.model("Product", schema);

export default product;
