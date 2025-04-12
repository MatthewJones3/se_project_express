/* const express = require("express");
const { validateUserBody } = require("../middleware/validation");

const router = express.Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, validateUserBody, updateUser);

module.exports = router; */

const express = require("express");
const { celebrate, Joi } = require("celebrate");

const router = express.Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    avatar: Joi.string().uri().required(),
  }),
});

router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, validateUserUpdate, updateUser);

module.exports = router;
