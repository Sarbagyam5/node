import { ROLE_ADMIN, ROLE_SELLER, ROLE_USER } from "../constants/roles.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import uploadfile from "../utils/file.js"
import hashPassword from "../utils/encryption.js"


async function getAllUsers(query) {
  return await User.find()
}

async function createSeller(data) {

  const userExist = await User.findOne({ email: data.email });

  if (userExist) throw new Error('User Already Exist');

  data.password = await hashPassword(data.password);

  data.role = [ROLE_USER, ROLE_SELLER];
  try {
    return await User.create(data);
  } catch (error) {
    throw new Error({ status: 400, message: "Cant create User" })
  }
}

async function getUserById(id) {
  return await User.findById(id)
}

async function deleteUserById(id) {
  return await User.findByIdAndDelete(id)
}

async function updateUserById(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true })
}

async function updateProfileImage(id, data) {
  const upload = await uploadfile([data]);
  return await User.findByIdAndUpdate(
    id,
    { profileImageUrl: upload.url },
    { new: true }
  )
}

async function changePasswordById(id, data) {
  const user = await User.findById(id)
  if (!user) throw new Error("No user Found")

  const isPasswordValid = await bcrypt.compare(data.oldPassword, user.password)
  console.log(isPasswordValid)

  if (!isPasswordValid) throw new Error("password not matched")

  const hashedPassword = await hashPassword(data.password);

  const updatedUser = await User.findByIdAndUpdate(id,
    { password: hashedPassword },
    { new: true })
  return updatedUser
}

async function resetPassword(id, data) {
  const hashedPassword = await hashPassword(data.password)
  return await User.findByIdAndUpdate(id, { password: hashedPassword })
}

export default {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  createSeller,
  updateProfileImage,
  changePasswordById,
  resetPassword
}