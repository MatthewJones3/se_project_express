const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const clothingItemsRoutes = require("./routes/clothingitems");
const { NOT_FOUND } = require("./utils/errors");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6791651ce3363fe4227c31b0",
  };
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(() => {});

app.use(usersRoutes);
app.use(clothingItemsRoutes);

app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

const { PORT = 3001 } = process.env;
app.listen(PORT);
