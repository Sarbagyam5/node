import express from 'express'
import { createOrder, getAllOrders } from '../controllers/orderControllers.js'
import auth from '../middlewares/auth.js'
import roleBasedAuth from '../middlewares/roleBasedAuth.js'
import { ROLE_ADMIN } from '../constants/roles.js'

const router = express.Router()

router.post("/", auth, createOrder)

router.get("/", auth, roleBasedAuth(ROLE_ADMIN), getAllOrders)

router.post("/:id", auth, createOrder)


export default router