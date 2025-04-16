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
    // eslint-disable-next-line no-unused-vars
    const { password, ...userData } = user.toObject();
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
    // eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line no-unused-vars
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
