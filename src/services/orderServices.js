import { ROLE_ADMIN } from "../constants/roles.js"
import order from "../models/Order.js"

async function createOrder(data) {
  try {
    return await order.create(data)
  } catch (error) {
    console.log(error)
    throw new Error("Can't create order")
  }
}

async function getAllOrders() {
  try {
    return await order.find()
      .populate({
        path: "userId",
        select: "-password -__v"
      })
      .populate({
        path: "orderItems.product",
        select: "-__v"
      })
  } catch (error) {
    console.log(error)
    throw new Error("Can't get order")
  }
}

async function updateOrderById(id, user, data) {
  const orderData = await order.findById(id);

  if (orderData.userId != user.id)
    if (user.role != ROLE_ADMIN)
      return Error({
        status: 401,
        message: "User not authorize"
      })

  try {
    return await order.findByIdAndUpdate(id, data)
  } catch (error) {
    throw error
  }
}
export default { createOrder, getAllOrders, updateOrderById }