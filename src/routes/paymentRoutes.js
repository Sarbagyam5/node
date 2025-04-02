import express from "express"
import { checkoutOrder, confirmPayment } from "../controllers/paymentControllers.js"
import auth from "../middlewares/auth.js";
const router = express.Router()

router.post("/checkoutOrder", auth, checkoutOrder)

router.put("/confirmPayment", auth, confirmPayment)


export default router;