import bcrypt from "bcryptjs"

async function hashPassword(data) {
  return await bcrypt.hash(data, 10)
}

export default hashPassword