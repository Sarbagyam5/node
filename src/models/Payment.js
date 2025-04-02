import mongoose from "mongoose";
const payment = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    ref: "Order"
  },
  amount: {
    type: Number,
    required: true,
    min: 10,
  },
  order: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "success", "failed"]
  },
  pidx: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  transactionId: {
    type: String,
    unique: true,
  }
})

const model = mongoose.model("payment", payment)
export default model