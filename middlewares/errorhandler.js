/// / I got extra help with this one, so I am not sure if I have it right.

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An error occurred on the server";

  return res.status(statusCode).send({ message });
};

module.exports = errorHandler;
