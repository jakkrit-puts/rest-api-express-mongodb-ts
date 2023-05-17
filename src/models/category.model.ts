import mongoose from "mongoose";

const schema = new mongoose.Schema({
  cat_id: { type: String, required: true, trim: true },
  cat_name: { type: String, required: true, trim: true },
  cat_desc: { type: String, required: true, trim: true },
}, {
  timestamps: true,
  collection: 'categories'
});

const category = mongoose.model("Category", schema);

export default category;
