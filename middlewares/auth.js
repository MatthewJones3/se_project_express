/*const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { UNAUTHORIZED } = require("../utils/errors");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(UNAUTHORIZED).json({ message: "Please authenticate." });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: "User not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: "Authentication failed." });
  }
};

module.exports = auth;*/

///// Sorry for keeping commented out code up top.
///// A method I have grown accoustomed to before knowing I have things correct.
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { UnauthorizedError } = require("../utils/UnauthorizedError");

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
    next(error);
  }
};

module.exports = auth;
