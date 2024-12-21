const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]
    if(!token){
      console.log("Token needed")
      return res.status(400).json({message: "Token is not provided"})
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    console.log(decoded)
    req.user = decoded
    console.log("Token decoded")
    next();
  } catch (error) {
    console.log("jwt error", error)
    return res.status(500).json({message: "Internal server error"})
  }
}