const JWT = require("jsonwebtoken");
const secret = "HELLOAMAN";

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
    age: user.age,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function verifyToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = { createToken, verifyToken };
