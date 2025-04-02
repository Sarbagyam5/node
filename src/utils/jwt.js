import jwt from "jsonwebtoken";


const generateToken = (data) => jwt.sign(data, process.env.SECRET)

const verifyToken = (authToken) => jwt.verify(authToken, process.env.SECRET)



export { generateToken, verifyToken };