const express = require("express");
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation");

const router = express.Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitems");

router.get("/items", getItems);
router.post("/items", auth, validateCardBody, createItem);
router.delete("/items/:itemId", auth, validateId, deleteItem);
router.put("/items/:itemId/likes", auth, validateId, likeItem);
router.delete("/items/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
