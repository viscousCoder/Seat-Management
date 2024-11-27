const { verifyToken } = require("../service/auth");

function checkAuthection() {
  return (req, res, next) => {
    const data = req.headers["authorization"];

    const token = data?.split("Bearer ")[1];
    // console.log(token);
    if (!token) {
      return next();
    }
    try {
      // console.log("heeeee");
      const userPayload = verifyToken(token);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}
module.exports = { checkAuthection };
