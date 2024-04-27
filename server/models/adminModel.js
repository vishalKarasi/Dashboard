import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  profilePic: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const Admin = mongoose.model("Admin", adminSchema);
