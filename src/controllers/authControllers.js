
import formatedUser from "../helper/userFormat.js";
import authServices from "../services/authServices.js"
import { generateToken } from "../utils/jwt.js";

const createUser = async (req, res) => {
  try {
    const data = req.body

    //Data Validations
    if (!data.name) throw new Error("Enter name");
    if (!data.gender) throw new Error("Enter gender");
    if (!data.dob) throw new Error("Enter date of birth");
    if (!data.email) throw new Error("Enter email");
    if (!data.password) throw new Error("Enter password");

    const user = await authServices.createUser(data);
    const token = generateToken(formatedUser(user));

    res.cookie("auth_token", token);
    res.json(formatedUser(user));
  } catch (error) {
    res.status(500).json(error.message);
  }

}

const loginUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.email) throw new Error("Enter email");
    if (!data.password) throw new Error("Enter password");

    const user = await authServices.loginUser(data);

    const token = generateToken(formatedUser(user));

    res.cookie("auth_token", token);
    res.json(formatedUser(user));

  } catch (error) {
    res.status(500).json(error.message);
  }

}



export { createUser, loginUser }