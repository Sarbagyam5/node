import express from "express";
import auth from "../middlewares/auth.js"
import {
  getProductById,
  deleteProduct,
  getAllProducts,
  updateProduct,
  createProduct
} from "../controllers/productControllers.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_SELLER } from "../constants/roles.js";

const router = express.Router();

router.get("/", getAllProducts)

router.post("/", auth, roleBasedAuth(ROLE_SELLER), createProduct)

router.get("/:id", getProductById)

router.delete("/:id", auth, roleBasedAuth(ROLE_SELLER), deleteProduct)

router.put("/:id", auth, roleBasedAuth(ROLE_SELLER), updateProduct)


export default router;