import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: String,
  category: {
    type: String,
    required: [true, 'category is required'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  description: String,
  imageUrls: {
    type: [String],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const model = mongoose.model("Product", productSchema);

export default model;