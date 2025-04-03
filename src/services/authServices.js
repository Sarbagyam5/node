import User from '../models/User.js'
import bcrypt from "bcryptjs";

//User Register
const createUser = async (data) => {
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) throw new Error("User already exist");

    if (!data.name) throw new Error("Enter name");

    const hashedPassword = await bcrypt.hash(data.password, 10)

    data.password = hashedPassword;
    console.log(data)

    const user = await User.create(data);
    return user;
  } catch (error) {
    return error.message
  }

}

//UserLogin
const loginUser = async (data) => {
  try {

    const authUser = await User.findOne({ email: data.email, });
    if (!authUser) throw new Error("Incorrect Email");


    const isPasswordValid = await bcrypt.compare(data.password, authUser.password);
    if (!isPasswordValid) throw new Error("Incorrect Password");



    return authUser;

  } catch (error) {
    throw error
  }
}


export default { createUser, loginUser }