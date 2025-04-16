const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const UnauthorizedError = require("../utils/UnauthorizedError");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new UnauthorizedError("Please authenticate.");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
