const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    });
    return res.status(200).json(user);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
    }
    if (error.statusCode === NOT_FOUND) {
      return res.status(NOT_FOUND).json({ message: error.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = new User({ name, avatar });
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: error.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

module.exports = { getUsers, getUser, createUser };
