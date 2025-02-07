const express = require("express");

const router = express.Router();
const {
  loginUser,
  createUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");
const auth = require("../middleware/auth.js"); // Explicitly add the .js extension

router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

module.exports = router;

/// / I really have no idea if this is correct. I apologize if I have changed too much
