const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_ERROR } = require("../utils/errors");

const auth = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Authorization required." });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return response
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Invalid token." });
  }

  request.user = payload;
  return next();
};

module.exports = auth;
