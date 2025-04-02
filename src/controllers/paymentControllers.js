import paymentServices from "../services/paymentServices.js"

async function checkoutOrder(req, res) {
  const data = req.body
  const user = req.user
  if (!data.returnUrl) return res.status(400).send("returnUrl required")
  if (!data.websiteUrl) return res.status(400).send("websiteUrl required")
  if (!data.amount) return res.status(400).send("amount required")
  if (!data.orderId) return res.status(400).send("orderId required")
  if (!data.order) return res.status(400).send("orderNo required")

  try {
    const response = await paymentServices.checkoutOrder({
      ...data, customerInfo: {
        name: user?.name,
        email: user?.email,
        phone: user?.phone || 9861495042
      }
    })
    res.json({
      paymentUrl: response.payment_url,
      expiresAt: response.expires_at,
      expiresIn: response.expires_in
    })
  } catch (error) {
    res.send(error)
  }
}

async function confirmPayment(req, res) {
  const data = req.query
  if (!data.status) return res.status(400).send("Status required");
  if (!data.tidx) return res.status(400).send("Transaction id required");
  if (!data.pidx) return res.status(400).send("Payment identifier is required");
  if(data.status != "success") return res.status(400).send("Transaction failed");
  try {
    const response = await paymentServices.confirmPayment(data)
    res.json(response)
  } catch (error) {
    res.send(error)
  }
}

export { checkoutOrder, confirmPayment }