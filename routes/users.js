const express = require("express");

const router = express.Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateUser);

module.exports = router;
