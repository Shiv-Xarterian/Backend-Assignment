const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const UserValidation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, Errors: errors.array() });
    }
    const Token = req.headers["token"];
    var decoded = jwt.verify(Token, process.env.Secret);
    if (!decoded) {
      throw new Error("Unauthorized");
    }
    req.id = decoded._id;
    console.log(decoded._id);
    next();
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      Error: error.message,
    });
  }
};

module.exports = UserValidation;
