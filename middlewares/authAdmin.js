const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const authAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).send("Please login first");
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    req.userData = await adminModel.findById(decode.id);
  } catch (err) {
    res.status(401).send("invalid token");
  }
  return next();
};

module.exports = authAdmin;
