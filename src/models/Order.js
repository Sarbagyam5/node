import mongoose from "mongoose";
const order = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      type: Number,
      default: 1
    },
    price: {
      type: Number,
      required: true,
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "processing", "shipped", "delivered", "canceled", "returned"]
  }
})

const model = mongoose.model("order", order)

export default model