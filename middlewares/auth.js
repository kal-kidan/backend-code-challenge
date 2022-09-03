const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  if (token === "dGhlc2VjcmV0dG9rZW4=") {
    next();
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};
module.exports = auth;
