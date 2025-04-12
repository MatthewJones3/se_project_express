/*const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
    this.name = "BadRequestError";
  }
}
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
    this.name = "UnauthorizedError";
  }
}
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
    this.name = "ForbiddenError";
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.name = "NotFoundError";
  }
}
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
    this.name = "ConflictError";
  }
}

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};*/

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

const BadRequestError = require("./BadRequestError");
const UnauthorizedError = require("./UnauthorizedError");
const ForbiddenError = require("./ForbiddenError");
const NotFoundError = require("./NotFoundError");
const ConflictError = require("./ConflictError");

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
