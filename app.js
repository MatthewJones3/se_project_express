/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { loginUser, createUser } = require("./controllers/users");
const clothingItemsRoutes = require("./routes/clothingitems");
const usersRoutes = require("./routes/users");
const { NOT_FOUND } = require("./utils/errors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(() => {});

app.post("/signin", loginUser);
app.post("/signup", createUser);

app.use(clothingItemsRoutes);
app.use(usersRoutes);

app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

const { PORT = 3001 } = process.env;
app.listen(PORT);*/

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { loginUser, createUser } = require("./controllers/users");
const clothingItemsRoutes = require("./routes/clothingitems");
const usersRoutes = require("./routes/users");
const { NOT_FOUND } = require("./utils/errors");
const errorHandler = require("./middlewares/errorhandler");
const { validateAuth, validateUserBody } = require("./middleware/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");


const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(() => {});

app.use(requestLogger);

app.post("/signin", loginUser);
app.post("/signup", createUser);

app.use(clothingItemsRoutes);
app.use(usersRoutes);

app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

const { PORT = 3001 } = process.env;
app.listen(PORT);
