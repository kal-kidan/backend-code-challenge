const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const services = require("../services/index.service");

const getCitiesByTag = catchAsync(async (req, res) => {
  const cities = await services.getCitiesByTag(
    req.query.tag,
    req.query.isActive
  );
  res.status(httpStatus.OK).send(cities);
});

const getDistance = catchAsync(async (req, res) => {
  const distance = await services.getDistance(req.query.from, req.query.to);
  res.status(httpStatus.OK).send(distance);
});

module.exports = {
  getCitiesByTag,
  getDistance,
};
