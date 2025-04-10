const {
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

module.exports = errorHandler;
