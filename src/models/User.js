import mongoose from "mongoose";
import { ROLE_ADMIN, ROLE_USER, ROLE_SELLER } from "../constants/roles.js"

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    required: true,
    default: ROLE_USER,
    enum: [ROLE_ADMIN, ROLE_USER, ROLE_SELLER]
  },
  profileImageUrl: {
    type: [String],
  }
})
const model = mongoose.model("User", authSchema)
export default model;