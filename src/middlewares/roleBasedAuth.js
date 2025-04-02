function roleBasedAuth(data) {
  return (req, res, next) => {
    if (req.user.role.includes(data)) return next();
    res.status(400).send("Not Authorize")
  }
}
export default roleBasedAuth;