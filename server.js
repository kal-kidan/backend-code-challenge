const express = require("express");
const httpStatus = require("http-status");
const cors = require("cors");
const { errorConverter, errorHandler } = require("./middlewares/error");
const { authLimiter } = require("./middlewares/rateLimiter");
const auth = require("./middlewares/auth");
const config = require("./config/config");
const routes = require("./routes/index.route");
const ApiError = require("./utils/ApiError");
const logger = require("./config/logger");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.options("*", cors());

if (config.env === "production") {
  app.use("/", authLimiter);
}

app.use(auth);
app.use("/", routes);
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

const server = app.listen(config.port, () => {
  logger.info(`Server listening to port ${config.port}`);
  logger.info(`Please run index.js in separate cmd (npm run index)`);
});

const unexpectedErrorHandler = (error) => {
  console.log(error);
  logger.error(error);
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

module.exports = app;
