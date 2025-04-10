/*const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

const createUser = async (req, res) => {
  const { name, avatar, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, avatar, email, password: hashedPassword });
    await user.save();
    const { password: _, ...userData } = user.toObject();
    return res.status(201).json(userData);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(CONFLICT).json({ message: "Email is already in use" });
    }
    if (error.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: error.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { password, ...userData } = user.toObject();
    return res.status(200).json(userData);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

const updateUser = async (req, res) => {
  const { name, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );
    const { password, ...userData } = user.toObject();
    return res.status(200).json(userData);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
    }
    if (error.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: error.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

module.exports = { loginUser, createUser, getCurrentUser, updateUser };*/

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, avatar, email, password: hashedPassword });
    await user.save();
    const { password: _, ...userData } = user.toObject();
    return res.status(201).json(userData);
  } catch (error) {
    if (error.code === 11000) {
      return next(new ConflictError("Email is already in use"));
    }
    if (error.name === "ValidationError") {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const { password, ...userData } = user.toObject();
    return res.status(200).json(userData);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { name, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const { password, ...userData } = user.toObject();
    return res.status(200).json(userData);
  } catch (error) {
    if (error.name === "CastError") {
      return next(new BadRequestError("Invalid ID format"));
    }
    if (error.name === "ValidationError") {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

module.exports = { loginUser, createUser, getCurrentUser, updateUser };
