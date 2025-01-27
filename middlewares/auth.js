const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config.js");
const { UNAUTHORIZED_ERROR } = require("../utils/errors.js");

const UnauthorizedError = require("../errors/UnauthorizedError.js");

const auth = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return next(new UnauthorizedError("Authorization required."));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Invalid token."));
  }

  request.user = payload;
  return next();
};

module.exports = auth;
