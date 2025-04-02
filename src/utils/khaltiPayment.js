import axios from "axios";

const khaltiPayment = async (data) => {

  const khaltiPaymentFormat = {
    return_url: data.returnUrl,
    website_url: data.websiteUrl,
    amount: data.amount * 100,
    purchase_order_id: data.orderId,
    purchase_order_name: data.order,
    customer_info: data.customerInfo
  }

  const response = await axios.post(process.env.KHALTI_URL, khaltiPaymentFormat, {
    headers: {
      Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json"
    }
  })
  return response
}

export default khaltiPayment