import { verifyToken } from "../utils/jwt.js";

function auth(req, res, next) {
  const cookie = req.headers.cookie
  if (!cookie) return res.status(401).send("user not authenticated")

  const authToken = cookie.split("=")[1]
  try {
    req.user = verifyToken(authToken);
    next();
  } catch (error) {
    res.status(401).send("invalid token")
  }
}
export default auth