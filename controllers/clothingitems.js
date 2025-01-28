const ClothingItem = require("../models/clothingitem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getItems = async (req, res) => {
  try {
    const items = await ClothingItem.find().populate("owner", "name avatar");
    return res.status(200).json(items);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id;

    const item = new ClothingItem({ name, weather, imageUrl, owner });
    await item.save();
    return res.status(201).json(item);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: error.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.itemId).orFail(() => {
      const error = new Error("Clothing item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    });
    await item.remove();
    return res.status(200).json({ message: "Item deleted" });
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

const likeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    });
    return res.status(200).json(item);
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

const dislikeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    });
    return res.status(200).json(item);
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

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
