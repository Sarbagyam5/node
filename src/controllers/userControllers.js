import { ROLE_ADMIN } from "../constants/roles.js"
import formatedUser from "../helper/userFormat.js"
import userServices from "../services/userServices.js"

async function createSeller(req, res) {
  const data = req.body
  if (!data.name) return res.status(400).send("User name is required");
  if (!data.gender) return res.status(400).send("Gender is required");
  if (!data.dob) return res.status(400).send("Date of birth is required");
  if (!data.email) return res.status(400).send("Email is required");
  if (!data.address) return res.status(400).send("Address is required");
  if (!data.password) return res.status(400).send("Password is required");

  try {
    const seller = await userServices.createSeller(data)
    res.json(seller)
  } catch (error) {
    return res.status(400).send(error.message || "Cant create user")
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userServices.getAllUsers()
    const formatUser = users.map(user => formatedUser(user))
    res.json(formatUser)
  } catch (error) {
    return res.status(404).send(error.message || "no user found")
  }
}

async function getUserById(req, res) {
  const id = req.params.id
  const user = req.user
  if (id != user.id && user.role.includes(ROLE_ADMIN)) {
    return res.status(401).send("Unauthorized access: You don't have permission to view this user.")
  }

  try {
    const user = await userServices.getUserById(id)
    res.json(formatedUser(user))
  } catch (error) {
    return res.status(404).send(error.message || "no user found")
  }
}

async function deleteUserById(req, res) {
  const id = req.params.id

  try {
    await userServices.deleteUserById(id)
    res.send(`User Id: ${id} deleted sucessfully`)
  } catch (error) {
    return res.status(404).send(error.message || "no user found")
  }
}

async function updateUserById(req, res) {
  const data = req.body;
  const user = req.user;
  const id = req.params.id

  const userExist = await userServices.getUserById(user.id)

  if (!data) return res.status(400).send("All fields are empty")
  if (data.password) return res.status(401).send("Unauthorized  access");
  if (req.params.id !== user.id && !user.role.includes(ROLE_ADMIN))
    return res.status(403).send("Forbidden: You are not allowed to update details");
  if (!userExist) return res.status(404).send("User not found")

  try {
    const user = await userServices.updateUserById(id, data)
    res.json(formatedUser(user))
  } catch (error) {
    return res.status(404).send(error.message || "no user found")
  }
}


async function uploadProfileImage(req, res) {
  const image = req.file;
  const id = req.user.id;
  if (!image) {
    return res.status(400).send("No image file provided");
  }
  try {
    const user = await userServices.updateProfileImage(id, image)
    res.json(formatedUser(user))
  } catch (error) {
    return res.status(500).send(error.message || "Failed to upload image")
  }
}

async function changePasswordById(req, res) {
  const authUser = req.user;
  const data = req.body;
  const id = req.params.id;
  const { password, oldPassword } = data;
  if (!password) throw res.status(400).send("No Password provided")
  if (!oldPassword) throw res.status(400).send("No Old Password provided")
  if (authUser.id != req.params.id && !authUser.role.includes(ROLE_ADMIN)) return res.status(403).send("Forbidden: You are not allowed to update this password");

  try {
    const user = await userServices.changePasswordById(id, {
      password: password,
      oldPassword: oldPassword
    })
    res.json(formatedUser(user))
  } catch (error) {
    return res.status(500).send(error.message || "Failed to change Password")
  }
}

async function resetPassword(req, res) {
  const data = req.body;
  const id = req.params.id
  try {
    const user = userServices.resetPassword(id, data)
    res.json(formatedUser(user))
  } catch (error) {
    res.status(409).send(error.message || "Unable to reset")
  }
}

export {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createSeller,
  changePasswordById,
  uploadProfileImage,
}