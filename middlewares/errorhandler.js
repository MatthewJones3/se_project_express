/*const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof BadRequestError) {
    return res.status(400).send({ message: err.message });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).send({ message: err.message });
  }
  if (err instanceof ForbiddenError) {
    return res.status(403).send({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).send({ message: err.message });
  }
  if (err instanceof ConflictError) {
    return res.status(409).send({ message: err.message });
  }

  return res.status(500).send({ message: "An error occurred on the server" });
};

module.exports = errorHandler;*/

//// I got extra help with this one, so I am not sure if I have it right.

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "An error occurred on the server";

  return res.status(statusCode).send({ message });
};

module.exports = errorHandler;
