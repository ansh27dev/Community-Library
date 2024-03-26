const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).send("Please login first");
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;

    req.userData = await userModel.findById(decode.id);
  } catch (err) {
    res.status(401).send("invalid token");
  }
  return next();
};

module.exports = auth;
