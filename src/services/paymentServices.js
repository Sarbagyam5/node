import payment from "../models/Payment.js";
import khaltiPayment from "../utils/khaltiPayment.js";

async function checkoutOrder(data) {
  try {
    const response = await khaltiPayment(data)

    payment.create({
      ...data,
      pidx: response.data.pidx
    })
    return response.data
  } catch (error) {
    console.error("Payment Error:", error.message);
    error.message
  }
}

async function confirmPayment(data) {
  try {
    return await payment.findOneAndUpdate({ pidx: data.pidx }, { ...data, transactionId: data.tidx }, { new: true })
  } catch (error) {
    error.message("Can't confirm payment")
  }
}
export default { checkoutOrder, confirmPayment };