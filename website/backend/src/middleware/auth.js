const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

require('dotenv').config();

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // check if token sent
  if (!token) {
    return res.status(401).json({ msg: "Missing token. Authorization denied." });
  }

  try {
    // check if token is correct
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // set user to be decoded token
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ msg: "Invalid token" })
  }
  

}

module.exports = auth;