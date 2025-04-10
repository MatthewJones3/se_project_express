/*const ClothingItem = require("../models/clothingitem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN
} = require("../utils/errors");

const getItems = async (req, res) => {
  try {
    const items = await ClothingItem.find();
    return res.status(200).json(items);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

const createItem = async (req, res) => {
  const { name, weather, imageUrl } = req.body;
  try {
    const item = new ClothingItem({
      name,
      weather,
      imageUrl,
      owner: req.user._id,
    });
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

    if (item.owner.toString() !== req.user._id.toString()) {
      return res
        .status(FORBIDDEN)
        .json({ message: "You are not authorized to delete this item" });
    }
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
  const { itemId } = req.params;
  try {
    const item = await ClothingItem.findById(itemId);
    if (!item) {
      return res.status(NOT_FOUND).json({ message: "Item not found" });
    }
    if (!item.likes.includes(req.user._id)) {
      item.likes.push(req.user._id);
      await item.save();
    }
    return res.status(200).json(item);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

const dislikeItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await ClothingItem.findById(itemId);
    if (!item) {
      return res.status(NOT_FOUND).json({ message: "Item not found" });
    }
    item.likes = item.likes.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "An error has occurred on the server." });
  }
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };*/

const ClothingItem = require("../models/clothingitem");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");

const getItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find();
    return res.status(200).json(items);
  } catch (error) {
    return next(error);
  }
};

const createItem = async (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  try {
    const item = new ClothingItem({
      name,
      weather,
      imageUrl,
      owner: req.user._id,
    });
    await item.save();
    return res.status(201).json(item);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findById(req.params.itemId).orFail(() => {
      throw new NotFoundError("Clothing item not found");
    });

    if (item.owner.toString() !== req.user._id.toString()) {
      throw new ForbiddenError("You are not authorized to delete this item");
    }
    await item.remove();
    return res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new BadRequestError("Invalid ID format"));
    }
    return next(error);
  }
};

const likeItem = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await ClothingItem.findById(itemId);
    if (!item) {
      throw new NotFoundError("Item not found");
    }
    if (!item.likes.includes(req.user._id)) {
      item.likes.push(req.user._id);
      await item.save();
    }
    return res.status(200).json(item);
  } catch (error) {
    if (error.name === "CastError") {
      return next(new BadRequestError("Invalid ID format"));
    }
    return next(error);
  }
};

const dislikeItem = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await ClothingItem.findById(itemId);
    if (!item) {
      throw new NotFoundError("Item not found");
    }
    item.likes = item.likes.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    if (error.name === "CastError") {
      return next(new BadRequestError("Invalid ID format"));
    }
    return next(error);
  }
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
