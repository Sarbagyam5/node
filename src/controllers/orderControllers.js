import orderServices from "../services/orderServices.js"
import { randomUUID } from "crypto"

const createOrder = async (req, res) => {
  const data = req.body;
  const orderNumber = randomUUID();
  const user = req.user;

  if (!data.orderItems) return res.status(400).send("OrderItems are required");
  if (!data.totalAmount) return res.status(400).send("Total amount is required");
  if (!data.shippingAddress) data.shippingAddress = user.address;
  try {
    const order = await orderServices.createOrder({
      ...data,
      orderNumber: orderNumber,
      userId: user.id
    });

    res.json(order)
  } catch (error) {
    res.status(500).send(error.message || "Failed to create order")
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderServices.getAllOrders()
    res.json(orders)
  } catch (error) {
    res.status(404).send(error.message || "Files Not Found")
  }
}

const updateOrderById = async (req, res) => {
  const data = req.body
  const id = req.header.params
  const user = req.user
  try {
    await orderServices.updateOrderById(id, user, data)
  } catch (error) {
    res.status(500).send(error.message || "Cant update file")
  }
}

export { createOrder, getAllOrders, updateOrderById }