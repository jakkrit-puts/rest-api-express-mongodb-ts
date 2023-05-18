import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    role: { type: String, required: true, default: "Member" }
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const user = mongoose.model("User", schema);

export default user;
