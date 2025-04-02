import express from "express"
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  createSeller,
  changePasswordById,
  uploadProfileImage,
} from "../controllers/userControllers.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_SELLER } from "../constants/roles.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", auth, roleBasedAuth(ROLE_ADMIN), createSeller)

router.get("/", auth, roleBasedAuth(ROLE_SELLER), getAllUsers)

router.get("/:id", auth, roleBasedAuth(ROLE_SELLER), getUserById)

router.delete("/:id", auth, roleBasedAuth(ROLE_ADMIN), deleteUserById)

router.put("/:id", auth, updateUserById)

router.put("/changepassword/:id", auth, changePasswordById)

router.put("/profile/upload", auth, uploadProfileImage)

export default router