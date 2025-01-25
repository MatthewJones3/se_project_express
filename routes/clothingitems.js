/*const express = require("express");
const router = express.Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitems");

router.get("/clothingitems", getItems);
router.post("/clothingitems", createItem);
router.delete("/clothingitems/:itemId", deleteItem);
router.put("/clothingitems/:itemId/likes", likeItem);
router.delete("/clothingitems/:itemId/likes", dislikeItem);

module.exports = router;*/

const express = require("express");
const router = express.Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitems");

router.get("/items", getItems);
router.post("/items", createItem);
router.delete("/items/:itemId", deleteItem);
router.put("/items/:itemId/likes", likeItem);
router.delete("/items/:itemId/likes", dislikeItem);

module.exports = router;
